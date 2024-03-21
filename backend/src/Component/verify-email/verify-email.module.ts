import { Module } from '@nestjs/common';
import { VerificationService } from './verify-email.service';
import { VerificationController } from './verify-email.controller';

@Module({
  providers: [VerificationService],
  controllers: [VerificationController],
})
export class VerifyEmailModule {}
