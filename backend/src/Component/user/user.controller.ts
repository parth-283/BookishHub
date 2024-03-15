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
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor, MulterModuleOptions } from '@nestjs/platform-express';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Post('/image/:id')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.userService.uploadFile(file);
  }

  // @Post('/image/:id')
  // @UseInterceptors(FileInterceptor('file', multerOptions))
  // async uploadFile(
  //   @Param('id') id: string,
  //   @UploadedFile() file: MulterModuleOptions,
  // ): Promise<any> {
  //   const uploadedImage = await this.userService.uploadFile(id, file);
  //   return uploadedImage;
  // }

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
