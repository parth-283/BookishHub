import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { EmailService } from '../email/email.service';
import { v4 as uuidv4 } from 'uuid';
import { ImagesService } from '../images/images.service';
import { Book, BookDocument } from '../books/schemas/book.schema';
import { BooksService } from '../books/books.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    private readonly emailService: EmailService,
    private readonly imagesService: ImagesService,
    private readonly bookService: BooksService,
    private readonly jwtService: JwtService,
  ) {}

  generateUUID(): string {
    const id: string = uuidv4();
    return id;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      this.logger.log('Creating new user.');

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const createdUser = new this.userModel({
        ...createUserDto,
        id: this.generateUUID(),
        slug:
          createUserDto.firstName.toLowerCase() +
          '-' +
          createUserDto.lastName.toLowerCase(),
        password: hashedPassword,
        role: 'user',
      });

      this.logger.log('Genrate verify-email token');
      // Generate verification token
      const verificationToken = this.jwtService.sign(
        { email: createUserDto.email },
        { secret: process.env.JWT_SECRET },
      );

      this.logger.log('Create new user with id:', createdUser.id);
      // Send welcome email with verification URL
      await this.emailService.sendWelcomeEmail(
        createUserDto.email,
        verificationToken,
      );

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

  async uploadImage(
    id: string,
    file: Express.Multer.File,
    coverImage?: boolean,
  ): Promise<boolean> {
    try {
      this.logger.log('Upload profile picture.');
      const imageResult = await this.imagesService.uploadImage(file);

      let query;

      if (coverImage) {
        query = { coverImage: imageResult };
      } else {
        query = { profileImage: imageResult };
      }

      this.logger.log('Save user profile in users collection.');
      // Update the user's profile image
      const updatedUser = await this.userModel.updateOne({ id }, query);

      if (updatedUser.matchedCount > 0 && updatedUser.acknowledged) {
        return true;
      } else {
        this.logger.error(
          `Error in upload image error: ${updatedUser.matchedCount}`,
        );
        throw new HttpException(
          'Something went wrong!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      this.logger.error(`Error in upload image error: ${error}`);

      throw new HttpException(
        'Failed to upload image',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).populate('books').exec();
  }

  async findBySlug(slug: string): Promise<User> {
    try {
      this.logger.log(`Get user data by slug: ${slug}`);

      return await this.userModel.findOne({ slug }).populate('books').exec();
    } catch (error) {
      this.logger.log(`Error in getBySlug error: ${error}`);

      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<User | null> {
    return await this.userModel.findOne({ _id: id });
  }

  async addBookRating(
    bookId: string,
    userId: string,
    rating: number,
  ): Promise<Book> {
    const book = await this.bookService.findById(bookId);
    const userRatingIndex = book.ratings.findIndex((r) => r.userId === userId);

    if (userRatingIndex !== -1) {
      // Update existing rating
      book.ratings[userRatingIndex].rating = rating;
    } else {
      // Add new rating
      book.ratings.push({ userId, rating });
    }

    // Calculate average rating
    const totalRating = book.ratings.reduce((acc, cur) => acc + cur.rating, 0);
    const averageRating = totalRating / book.ratings.length;
    book.averageRating = averageRating;

    return this.bookService.update(bookId, book);
  }

  async update(id: string, updateUserDto: any): Promise<User | null> {
    return this.userModel
      .findOneAndUpdate({ id }, updateUserDto, { new: true })
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

  async addToCart(
    userId: string,
    bookId: string,
    quantity: number,
  ): Promise<Book> {
    const user = await this.userModel.findOne({ id: userId }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const book = await this.bookModel.findOne({ id: bookId }).exec();
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    user.cart.push({ bookId, quantity });

    await user.save();
    return book;
  }

  async removeFromCart(userId: string, bookId: string): Promise<void> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const index = user.cart.findIndex((item) => item.bookId === bookId);
    if (index !== -1) {
      user.cart.splice(index, 1);
      await user.save();
    }
  }

  async getAllCartItems(
    userId: string,
  ): Promise<{ book: Book; quantity: number }[]> {
    const user = await this.userModel.findOne({ id: userId }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const cartItems = await Promise.all(
      user.cart.map(async (item) => {
        const book = await this.bookModel.findOne({ id: item.bookId }).exec();
        return { book, quantity: item.quantity };
      }),
    );

    return cartItems;
  }
}
