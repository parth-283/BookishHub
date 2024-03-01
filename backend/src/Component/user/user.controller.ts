// user.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    return this.userService.findById(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
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
