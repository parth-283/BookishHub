// verification.controller.ts

import { Controller, Get, Query } from '@nestjs/common';
import { VerificationService } from './verify-email.service';

@Controller('verify-email')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Get()
  async verifyEmail(@Query('token') token: string): Promise<string> {
    // Call verification service to verify email
    const result = await this.verificationService.verifyEmail(token);

    // Return response based on verification result
    if (result) {
      return 'Email verified successfully';
    } else {
      return 'Invalid verification token';
    }
  }
}
