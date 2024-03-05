// admin.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateBookDto } from '../books/dto/create-book.dto';
import { CreateUserDto } from '../user/dto/create-user.dto/create-user.dto';
import { CreateContactDto } from '../contact/dto/create-contact.dto/create-contact.dto';
import { UpdateContactDto } from '../contact/dto/update-contact.dto/update-contact.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // User Management APIs

  @Get('users')
  async getUsers() {
    return await this.adminService.getUsers();
  }

  @Post('users')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.adminService.createUser(createUserDto);
  }

  @Put('users/:id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: any) {
    return await this.adminService.updateUser(id, updateUserDto);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.adminService.deleteUser(id);
  }

  // Book Management APIs

  @Get('books')
  async getBooks() {
    return await this.adminService.getBooks();
  }

  @Post('books')
  async createBook(@Body() createBookDto: CreateBookDto) {
    return await this.adminService.createBook(createBookDto);
  }

  @Put('books/:id')
  async updateBook(@Param('id') id: string, @Body() updateBookDto: any) {
    return await this.adminService.updateBook(id, updateBookDto);
  }

  @Delete('books/:id')
  async deleteBook(@Param('id') id: string) {
    return await this.adminService.deleteBook(id);
  }

  // Contact Management APIs

  @Get('contacts')
  async getContacts() {
    return await this.adminService.getContacts();
  }

  @Post('contacts')
  async createContact(@Body() createContactDto: CreateContactDto) {
    return await this.adminService.createContact(createContactDto);
  }

  @Put('contacts/:id')
  async updateContact(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    return await this.adminService.updateContact(id, updateContactDto);
  }

  @Delete('contacts/:id')
  async deleteContact(@Param('id') id: string) {
    return await this.adminService.deleteContact(id);
  }
  /*  
  // Billing Management APIs

  @Get('billing')
  async getBillingInfo() {
    return await this.adminService.getBillingInfo();
  }

  @Post('billing')
  async createBillingInfo(@Body() createBillingInfoDto: CreateBillingInfoDto) {
    return await this.adminService.createBillingInfo(createBillingInfoDto);
  }

  @Put('billing/:id')
  async updateBillingInfo(
    @Param('id') id: string,
    @Body() updateBillingInfoDto: UpdateBillingInfoDto,
  ) {
    return await this.adminService.updateBillingInfo(id, updateBillingInfoDto);
  }

  @Delete('billing/:id')
  async deleteBillingInfo(@Param('id') id: string) {
    return await this.adminService.deleteBillingInfo(id);
  } */
}
