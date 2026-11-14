import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import {RegisterDto} from './dto/register.dto.js';
import * as bcrypt from 'bcrypt';
import { EmailService } from '../email/email.service.js';
import { randomBytes,randomUUID, createHash } from 'crypto';
import { RedisService } from '../redis/redis.service.js';
import { VerifyEmailDto } from './dto/verify-email.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly emailService: EmailService,
        private readonly redisService: RedisService,
        private readonly jwtService: JwtService, 
        private readonly configService: ConfigService) {}

    async register(registerDto: RegisterDto) {
        const existingUser = await this.prisma.user.findUnique({
            where:{email:registerDto.email}
        })
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }
        if(registerDto.password !== registerDto.confirmPassword){
            throw new BadRequestException ('Passwords do not match');
        }
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const verificationToken = randomBytes(32).toString('hex');

        const tokenHash = createHash('sha256')
            .update(verificationToken)
            .digest('hex');

        const pendingRegistration = {
        fullName: registerDto.fullName,
        email: registerDto.email,
        passwordHash: hashedPassword,
        };

        await this.redisService.set(
            `pending-registration:${tokenHash}`,
            JSON.stringify(pendingRegistration),
            900,
        );
        const verificationUrl = `http://localhost:5173/verify-email?token=${verificationToken}`;

        await this.emailService.sendVerificationEmail(
            registerDto.email,
            verificationUrl,
        );
        return {
        message: 'Registration received. Please check your email to verify your account.',
    };
}

    async verifyEmail(verifyEmailDto: VerifyEmailDto) {
        const tokenHash = createHash('sha256')
            .update(verifyEmailDto.token)
            .digest('hex');

        const pendingData = await this.redisService.get(
            `pending-registration:${tokenHash}`,
        );

        if (!pendingData) {
            throw new BadRequestException(
                'Invalid or expired verification token',
            );
        
        }
        const pendingRegistration = JSON.parse(pendingData);
        const existingUser = await this.prisma.user.findUnique({
        where: {
            email: pendingRegistration.email,
        },
    });

        if (existingUser) {
            await this.redisService.del(
                `pending-registration:${tokenHash}`,
            );

            throw new ConflictException('Email already exists');
        }
        const newUser = await this.prisma.user.create({
            data: {
                fullName: pendingRegistration.fullName,
                email: pendingRegistration.email,
                passwordHash: pendingRegistration.passwordHash,
                isEmailVerified: true,
            },
        });
        await this.redisService.del(
        `pending-registration:${tokenHash}`);
        return {
        message: 'Email verified successfully. Your account has been created.',
        user: {
            id: newUser.id,
            fullName: newUser.fullName,
            email: newUser.email,
            role: newUser.role,
        }};
    }
    async login(loginDto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: loginDto.email },
        });
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }
        if (!user.isEmailVerified) {
            throw new UnauthorizedException('Please verify your email first');
        }
        if (!user.passwordHash) {
            throw new UnauthorizedException('Invalid email or password');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password');
        }
        return this.generateTokens({
            id: user.id,
            email: user.email,
            role: user.role,
        });
    }

    private async generateTokens(user: {
    id: string;
    email: string;
    role: string;}, sessionId?: string,)
    {
    sessionId = sessionId ?? randomUUID();
    const payload = {
        sub: user.id,
        email: user.email,
        role: user.role,
        sid: sessionId
    };

    const accessToken = await this.jwtService.signAsync(payload);

    const refreshToken = await this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: '30d'
    });
    const refreshTokenHash = createHash('sha256').update(refreshToken).digest('hex');
    await this.redisService.set(`refresh-token:${user.id}:${sessionId}`,refreshTokenHash,30 * 24 * 60 * 60,
);

    return {
        accessToken,
        refreshToken,
    };
}

async refresh(refreshToken: string) {
    let payload;

    try {
        payload = await this.jwtService.verifyAsync(refreshToken, {
            secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
        });
    } catch {
        throw new UnauthorizedException('Invalid or expired refresh token');
    }
        if (
        typeof payload.sub !== 'string' ||
        typeof payload.sid !== 'string'
    ) {
        throw new UnauthorizedException('Invalid refresh token');
    }
    const userId = payload.sub;
    const sessionId = payload.sid;
    const redisKey = `refresh-token:${userId}:${sessionId}`;
    const storedRefreshTokenHash = await this.redisService.get(redisKey);
    if (!storedRefreshTokenHash) {
    throw new UnauthorizedException('Session is invalid or expired');}

    const receivedTokenHash = createHash('sha256').update(refreshToken).digest('hex');

    if (receivedTokenHash !== storedRefreshTokenHash) {
        throw new UnauthorizedException('Invalid refresh token');
    }
    const user = await this.prisma.user.findUnique({
    where: {
        id: userId,
    },
});

if (!user) {
    throw new UnauthorizedException('User not found');
} 
return this.generateTokens(
    {
        id: user.id,
        email: user.email,
        role: user.role,
    },
    sessionId,
);
}
}


