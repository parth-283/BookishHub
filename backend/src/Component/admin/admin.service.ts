// admin.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../user/dto/create-user.dto/create-user.dto';
import { CreateBookDto } from '../books/dto/create-book.dto';
import { User } from '../user/schemas/user.schema';
import { Book } from '../books/schemas/book.schema';
import { Contact } from '../contact/schemas/create-schema';
import { UpdateContactDto } from '../contact/dto/update-contact.dto/update-contact.dto';
import { CreateContactDto } from '../contact/dto/create-contact.dto/create-contact.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
    @InjectModel(Contact.name) private readonly contactModel: Model<Contact>,
    // @InjectModel(BillingInfo.name)
    // private readonly billingInfoModel: Model<BillingInfo>,
  ) {}

  // User Management

  async getUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async updateUser(id: string, updateUserDto: any): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async deleteUser(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }

  // Book Management

  async getBooks(): Promise<Book[]> {
    return await this.bookModel.find().exec();
  }

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const createdBook = new this.bookModel(createBookDto);
    return await createdBook.save();
  }

  async updateBook(id: string, updateBookDto: any): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, updateBookDto, {
      new: true,
    });
  }

  async deleteBook(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id);
  }

  // Contact Management

  async getContacts(): Promise<Contact[]> {
    return await this.contactModel.find().exec();
  }

  async createContact(createContactDto: CreateContactDto): Promise<Contact> {
    const createdContact = new this.contactModel(createContactDto);
    return await createdContact.save();
  }

  async updateContact(
    id: string,
    updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    return await this.contactModel.findByIdAndUpdate(id, updateContactDto, {
      new: true,
    });
  }

  async deleteContact(id: string): Promise<Contact> {
    return await this.contactModel.findByIdAndDelete(id);
  }

  /*
  // Billing Management

  async getBillingInfo(): Promise<BillingInfo[]> {
    return await this.billingInfoModel.find().exec();
  }

  async createBillingInfo(
    createBillingInfoDto: CreateBillingInfoDto,
  ): Promise<BillingInfo> {
    const createdBillingInfo = new this.billingInfoModel(createBillingInfoDto);
    return await createdBillingInfo.save();
  }

  async updateBillingInfo(
    id: string,
    updateBillingInfoDto: UpdateBillingInfoDto,
  ): Promise<BillingInfo> {
    return await this.billingInfoModel.findByIdAndUpdate(
      id,
      updateBillingInfoDto,
      { new: true },
    );
  }

  async deleteBillingInfo(id: string): Promise<BillingInfo> {
    return await this.billingInfoModel.findByIdAndDelete(id);
  } */
}
