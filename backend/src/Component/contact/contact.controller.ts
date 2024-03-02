// contact.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto/update-contact.dto';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  async getAllContacts() {
    return await this.contactService.getAllContacts();
  }

  @Get(':id')
  async getContactById(@Param('id') id: string) {
    return await this.contactService.getContactById(id);
  }

  @Post()
  async createContact(@Body() createContactDto: CreateContactDto) {
    return await this.contactService.createContact(createContactDto);
  }

  @Put(':id')
  async updateContact(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    return await this.contactService.updateContact(id, updateContactDto);
  }

  @Delete(':id')
  async deleteContact(@Param('id') id: string) {
    return await this.contactService.deleteContact(id);
  }
}
