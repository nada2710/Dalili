import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { EmailModule } from '../email/email.module.js';
import { RedisModule } from '../redis/redis.module.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';



@Module({
  imports: [PrismaModule, EmailModule , RedisModule, 
    JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
        signOptions: {
            expiresIn: '15m',
        },
    }),
}),
  ],
  controllers: [AuthController],
  providers: [AuthService]

})
export class AuthModule {}
