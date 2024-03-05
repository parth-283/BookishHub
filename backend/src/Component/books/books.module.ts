import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/book.schema';
import { UserService } from '../user/user.service';
import { CategoryService } from '../category/category.service';
import { CategoryModule } from '../category/category.module';
import { UserModule } from '../user/user.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    CategoryModule,
    UserModule,
    EmailModule,
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  controllers: [BooksController],
  providers: [BooksService, UserService, CategoryService],

  exports: [BooksService, MongooseModule],
})
export class BooksModule {}
