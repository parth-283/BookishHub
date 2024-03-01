// payment/payment.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-payment-intent')
  async createPaymentIntent(
    @Body() body: { amount: number; currency: string },
  ): Promise<{ clientSecret: string }> {
    const { amount, currency } = body;
    const clientSecret = await this.paymentService.createPaymentIntent(
      amount,
      currency,
    );
    return { clientSecret };
  }
}
