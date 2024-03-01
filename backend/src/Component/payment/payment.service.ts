// payment/payment.service.ts

import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private readonly stripe: Stripe;

  constructor() {
    this.stripe = new Stripe('YOUR_SECRET_KEY', {
      apiVersion: '2023-10-16',
    });
  }

  async createPaymentIntent(amount: number, currency: string): Promise<string> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency,
    });
    return paymentIntent.client_secret;
  }
}
