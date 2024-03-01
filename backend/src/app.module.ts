import { UserModule } from './Component/user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from './logger/logger.module';
import { BooksModule } from './Component/books/books.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './component/email/email.module';
import { VerifyEmailModule } from './component/verify-email/verify-email.module';
import { PaymentModule } from './component/payment/payment.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(`${process.env.DATABASE_URL}`),
    BooksModule,
    LoggerModule,
    UserModule,
    AuthModule,
    EmailModule,
    VerifyEmailModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
