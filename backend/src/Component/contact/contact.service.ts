// contact.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContactDto } from './dto/create-contact.dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto/update-contact.dto';
import { Contact } from './schemas/create-schema';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private readonly contactModel: Model<Contact>,
  ) {}

  async getAllContacts(): Promise<Contact[]> {
    return await this.contactModel.find().exec();
  }

  async getContactById(id: string): Promise<Contact | null> {
    return await this.contactModel.findById(id).exec();
  }

  async createContact(createContactDto: CreateContactDto): Promise<Contact> {
    const createdContact = new this.contactModel(createContactDto);
    return await createdContact.save();
  }

  async updateContact(
    id: string,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact | null> {
    return await this.contactModel
      .findByIdAndUpdate(id, updateContactDto, { new: true })
      .exec();
  }

  async deleteContact(id: string): Promise<Contact | null> {
    return await this.contactModel.findByIdAndDelete(id).exec();
  }
}
