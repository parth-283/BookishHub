// user.module.ts

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
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Provide your JWT secret key here
      signOptions: { expiresIn: '1h' }, // Example sign options
    }),
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
