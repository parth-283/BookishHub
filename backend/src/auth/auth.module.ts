// auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategyService } from './jwt.strategy/jwt.strategy.service';
import { UserModule } from '../Component/user/user.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'sgdfkghdfkhgkdfgkdhfkghdkhgkdhffghkghdkghdjhg',
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategyService],
  controllers: [AuthController],
})
export class AuthModule {}
