// payment/payment.service.ts

import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { Book } from '../books/schemas/book.schema';
import { BooksService } from '../books/books.service';

@Injectable()
export class PaymentService {
  private readonly stripe: Stripe;

  constructor(private booksService: BooksService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
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

  async createProduct(
    name: string,
    description: string,
  ): Promise<Stripe.Product> {
    return this.stripe.products.create({
      name,
      description,
    });
  }

  async setPriceForProduct(
    productId: string,
    price: number,
    currency: string,
  ): Promise<Stripe.Price> {
    return this.stripe.prices.create({
      product: productId,
      unit_amount: price * 100, // Amount in cents
      currency,
    });
  }

  async updateBookWithStripeData(
    bookId: string,
    productId: string,
    priceId: string,
  ): Promise<Book> {
    return this.booksService.updateBookWithStripeData(
      bookId,
      productId,
      priceId,
    );
  }

  async createProductOnStripe(
    name: string,
    description: string,
    price: number,
    currency: string,
    bookId: string,
  ): Promise<any> {
    // Create product on Stripe
    const product = await this.createProduct(name, description);

    // Set price for the product on Stripe
    const priceObject = await this.setPriceForProduct(
      product.id,
      price,
      currency,
    );

    // Update book document with Stripe product and price IDs
    return this.updateBookWithStripeData(bookId, product.id, priceObject.id);
  }
}
