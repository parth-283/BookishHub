// user.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/utils/multer.config';
import { Book } from '../books/schemas/book.schema';
import { AddRatingDto } from '../books/dto/rating.book.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('image/:coverImage/:id')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadImage(
    @Param('id') id: string,
    @Param('coverImage') coverImage: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (!file) {
        throw new Error('No file uploaded');
      }

      const result = await this.userService.uploadImage(
        id,
        file,
        coverImage == 'true',
      );
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Get(':slug')
  async findOne(
    @Param('slug') slug: string,
  ): Promise<{ data: User; isSuccess: boolean }> {
    const userData = await this.userService.findBySlug(slug);
    return { data: userData, isSuccess: true };
  }

  @Get('email/:email')
  async findOneByEmail(@Param('email') email: string): Promise<User | null> {
    return await this.userService.findOneByEmail(email);
  }

  @Post('books/:bookId/ratings')
  async addRating(
    @Param('bookId') bookId: string,
    @Body() ratingDto: AddRatingDto,
  ): Promise<Book> {
    const { userId, rating } = ratingDto;
    return this.userService.addBookRating(bookId, userId, rating);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: any,
  ): Promise<User | null> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User | null> {
    return this.userService.delete(id);
  }

  @Put(':id/books/:bookId')
  async addBookToUser(
    @Param('id') id: string,
    @Param('bookId') bookId: string,
  ): Promise<User | null> {
    return this.userService.addBookToUser(id, bookId);
  }

  @Delete(':id/books/:bookId')
  async removeBookFromUser(
    @Param('id') id: string,
    @Param('bookId') bookId: string,
  ): Promise<User | null> {
    return this.userService.removeBookFromUser(id, bookId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('cart/add/:bookId/:quantity')
  async addToCart(
    @Req() req: any,
    @Param('bookId') bookId: string,
    @Param('quantity') quantity: number,
  ): Promise<Book> {
    const userId = req.user.sub;
    return this.userService.addToCart(userId, bookId, quantity);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('cart/remove/:bookId')
  async removeFromCart(
    @Req() req: any,
    @Param('bookId') bookId: string,
  ): Promise<void> {
    const userId = req.user.sub;
    return this.userService.removeFromCart(userId, bookId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get/cart')
  async getAllCartItems(
    @Req() req: any,
  ): Promise<{ book: Book; quantity: number }[]> {
    const userId = req.user.sub;
    return this.userService.getAllCartItems(userId);
  }
}
