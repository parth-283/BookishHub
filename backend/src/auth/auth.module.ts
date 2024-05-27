// auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategyService } from './jwt.strategy/jwt.strategy.service';
import { UserModule } from '../Component/user/user.module';
import { PasswordResetUtil } from '.././utils/password-reset.util';
import { EmailModule } from '../Component/email/email.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret:
        process.env.JWT_SECRET ||
        '54b89e9249d80f3f6b80ec4a97d2f2b9fd7c3f91697b1682ec566df6d1b27bc8',
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
    EmailModule,
  ],
  providers: [AuthService, JwtStrategyService, PasswordResetUtil],
  controllers: [AuthController],
})
export class AuthModule { }
