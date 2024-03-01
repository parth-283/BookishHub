import { Module } from '@nestjs/common';
import { VerificationController } from './verify-email.controller';
import { VerificationService } from './verify-email.service';

@Module({
  providers: [VerificationService],
  controllers: [VerificationController],
})
export class VerifyEmailModule {}
