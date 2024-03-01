import { UserModule } from './Component/user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from './logger/logger.module';
import databaseConfig from './config/database.config';
import { BooksModule } from './Component/books/books.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(databaseConfig.uri),
    BooksModule,
    LoggerModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
