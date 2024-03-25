// payment/payment.module.ts

import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { BooksModule } from '../books/books.module'; // Import any other modules if needed

@Module({
  imports: [BooksModule], // Import any other modules your payment module depends on
  controllers: [PaymentController], // Register the payment controller
  providers: [PaymentService], // Register the payment service
})
export class PaymentModule {} // Export the PaymentModule class
