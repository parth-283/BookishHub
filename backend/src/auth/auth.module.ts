// auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategyService } from './jwt.strategy/jwt.strategy.service';
import { UserModule } from '../Component/user/user.module';
import { PasswordResetUtil } from 'src/utils/password-reset.util';
import { EmailModule } from 'src/Component/email/email.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
    EmailModule,
  ],
  providers: [AuthService, JwtStrategyService, PasswordResetUtil],
  controllers: [AuthController],
})
export class AuthModule {}
