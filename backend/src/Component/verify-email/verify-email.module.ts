import { Module } from '@nestjs/common';
import { VerificationService } from './verify-email.service';
import { VerificationController } from './verify-email.controller';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserModule],
  providers: [VerificationService, JwtService],
  controllers: [VerificationController],
})
export class VerifyEmailModule {}
