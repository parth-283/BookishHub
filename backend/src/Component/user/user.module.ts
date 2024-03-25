import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { EmailModule } from '../email/email.module';
import { JwtAuthGuard } from 'src/guard/jwt-auth/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { ImagesModule } from '../images/images.module';
import { BooksModule } from '../books/books.module';
import { BooksService } from '../books/books.service';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    BooksModule,
    CategoryModule,
    EmailModule,
    ImagesModule,
  ],
  providers: [UserService, BooksService, JwtAuthGuard],
  controllers: [UserController],
  exports: [UserService, MongooseModule],
})
export class UserModule {}
