// verification.controller.ts

import { Controller, Post, Query } from '@nestjs/common';
import { VerificationService } from './verify-email.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('verify-email')
@Controller('verify-email')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post()
  async verifyEmail(@Query('token') token: string): Promise<boolean | string> {
    // Call verification service to verify email
    return await this.verificationService.verifyEmail(token);
  }
}
