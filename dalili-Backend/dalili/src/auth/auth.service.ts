import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import {RegisterDto} from './dto/register.dto.js';
import * as bcrypt from 'bcrypt';
import { EmailService } from '../email/email.service.js';
import { randomBytes, createHash } from 'crypto';
import { RedisService } from '../redis/redis.service.js';
import { VerifyEmailDto } from './dto/verify-email.dto.js';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly emailService: EmailService, private readonly redisService: RedisService) {}

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
}

