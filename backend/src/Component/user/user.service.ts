import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { EmailService } from '../email/email.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly emailService: EmailService,
  ) {}

  generateUUID(): string {
    const id: string = uuidv4();
    return id;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const createdUser = new this.userModel({
        ...createUserDto,
        id: this.generateUUID(),
        password: hashedPassword,
      });

      // Send welcome email with verification URL
      // await this.emailService.sendWelcomeEmail(
      //   createUserDto.email,
      //   process.env.JWT_SECRET,
      // );

      return await createdUser.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpException('Duplicate key error:', HttpStatus.CONFLICT);
      } else if (error.code === 'SomeErrorCode') {
        throw new HttpException(
          'Specific error message',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return await this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: any): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async addBookToUser(id: string, bookId: string): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, { $push: { books: bookId } }, { new: true })
      .exec();
  }

  async removeBookFromUser(id: string, bookId: string): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, { $pull: { books: bookId } }, { new: true })
      .exec();
  }
}
