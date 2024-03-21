import { UserModule } from './Component/user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from './logger/logger.module';
import { BooksModule } from './Component/books/books.module';
import { AuthModule } from './auth/auth.module';
import { VerifyEmailModule } from './component/verify-email/verify-email.module'; // Update path
import { PaymentModule } from './component/payment/payment.module'; // Update path
import { AdminModule } from './component/admin/admin.module'; // Update path
import { ContactService } from './component/contact/contact.service'; // Update path
import { ContactController } from './component/contact/contact.controller'; // Update path
import { ContactModule } from './component/contact/contact.module'; // Update path
import * as dotenv from 'dotenv';
import { CategoryModule } from './component/category/category.module'; // Update path
import { ImagesModule } from './component/images/images.module'; // Update path
import { EmailModule } from './Component/email/email.module'; // Update path

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL),
    BooksModule,
    LoggerModule,
    UserModule,
    AuthModule,
    EmailModule,
    VerifyEmailModule,
    PaymentModule,
    AdminModule,
    ContactModule,
    CategoryModule,
    ImagesModule,
  ],
  controllers: [AppController, ContactController],
  providers: [AppService, ContactService],
})
export class AppModule {}
