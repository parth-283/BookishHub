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
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/guard/jwt-auth/jwt-auth.guard';
import { multerOptions } from 'src/utils/multer.config';

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
    @Param('coverImage') coverImage: boolean,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (!file) {
        throw new Error('No file uploaded');
      }

      const result = await this.userService.uploadImage(id, file, coverImage);
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
}
