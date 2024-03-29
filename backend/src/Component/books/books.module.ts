import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/book.schema';
import { CategoryModule } from '../category/category.module';
import { UserModule } from '../user/user.module';
import { EmailModule } from '../email/email.module';
import { ImagesModule } from '../images/images.module';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { UserService } from '../user/user.service';
import { CategoryService } from '../category/category.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    forwardRef(() => UserModule),
    CategoryModule,
    EmailModule,
    ImagesModule,
  ],
  controllers: [BooksController],
  providers: [BooksService, JwtService, UserService, CategoryService],

  exports: [BooksService, MongooseModule],
})
export class BooksModule {}
