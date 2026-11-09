import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { EmailModule } from '../email/email.module.js';
import { RedisModule } from '../redis/redis.module.js';


@Module({
  imports: [PrismaModule, EmailModule , RedisModule],
  controllers: [AuthController],
  providers: [AuthService]

})
export class AuthModule {}
