import { UserModule } from './Component/user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from './logger/logger.module';
import databaseConfig from './config/database.config';
import { BooksModule } from './Component/books/books.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './component/email/email.module';
import { VerifyEmailModule } from './component/verify-email/verify-email.module';

@Module({
  imports: [
    MongooseModule.forRoot(databaseConfig.uri),
    BooksModule,
    LoggerModule,
    UserModule,
    AuthModule,
    EmailModule,
    VerifyEmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
