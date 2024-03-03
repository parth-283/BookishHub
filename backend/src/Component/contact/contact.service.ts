// contact.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContactDto } from './dto/create-contact.dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto/update-contact.dto';
import { Contact } from './schemas/create-schema';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  constructor(
    @InjectModel(Contact.name) private readonly contactModel: Model<Contact>,
  ) {}

  generateUUID(): string {
    const id: string = uuidv4();
    return id;
  }

  async getAllContacts(): Promise<Contact[]> {
    return await this.contactModel.find().exec();
  }

  async getContactById(id: string): Promise<Contact | null> {
    return await this.contactModel.findById(id).exec();
  }

  async createContact(createContactDto: CreateContactDto): Promise<Contact> {
    const createdContact = new this.contactModel({
      ...createContactDto,
      id: this.generateUUID(),
    });

    this.logger.log('Creating new contact with id:', createdContact.id);

    const addIdContact = new this.contactModel(createdContact);

    this.logger.log('New contact added successfully.');
    return await addIdContact.save();
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
