import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './Component/email/email.module';
import { VerifyEmailModule } from './Component/verify-email/verify-email.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './Component/admin/admin.module';
import { PaymentModule } from './Component/payment/payment.module';
import { ContactModule } from './Component/contact/contact.module';
import { CategoryModule } from './Component/category/category.module';
import { ImagesModule } from './Component/images/images.module';
import { BooksModule } from './Component/books/books.module';
import { UserModule } from './Component/user/user.module';
import { ContactController } from './Component/contact/contact.controller';
import { ContactService } from './component/contact/contact.service';

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
