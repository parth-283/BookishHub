// payment/payment.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';

@ApiTags('payment')
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

  @Post('create-product')
  async createProductOnStripe(@Body() product: CreateProductDto): Promise<any> {
    try {
      const result = await this.paymentService.createProductOnStripe(
        product.name,
        product.description,
        product.price,
        product.currency,
        product.bookId,
      );
      return { success: true, data: result };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
