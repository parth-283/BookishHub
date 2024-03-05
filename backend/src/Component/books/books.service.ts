import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { Book, BookDocument } from './schemas/book.schema';
import { v4 as uuidv4 } from 'uuid';
import { User, UserDocument } from '../user/schemas/user.schema';
import {
  Category,
  CategoryDocument,
} from '../category/schema/category.schema/category.schema';

@Injectable()
export class BooksService {
  private readonly logger = new Logger(BooksService.name);

  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  generateUUID(): string {
    const id: string = uuidv4();
    return id;
  }

  async create(createBookDto: CreateBookDto): Promise<any> {
    try {
      const { userId, categoryId } = createBookDto;

      const slug = createBookDto.title.toLowerCase().split(' ').join('-');

      // Create a new book
      const createdbook = new this.bookModel({
        ...createBookDto,
        id: this.generateUUID(),
        slug: slug,
      });

      const createdBook = new this.bookModel(createdbook);
 
      await createdBook.save();
      this.logger.log('Book added successfully.');

      // Add book ID to user's list of books
      this.logger.log('Add book on user by id:', userId);

      await this.userModel.findByIdAndUpdate(
        { id: userId },
        {
          $push: { books: createdBook._id },
        },
      );

      // Add book ID to category's list of books
      this.logger.log('Add book on category by id:', categoryId);
      await this.categoryModel.findByIdAndUpdate(
        { id: categoryId },
        {
          $push: { books: createdBook._id },
        },
      );

      return {
        message: 'Book added successfully',
        book: createdBook,
        isSuccessfully: true,
      };
    } catch (error) {
      console.error(error);
      return {
        message: 'Failed to add book',
        error: error,
        isSuccessfully: false,
      };
    }
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findOne(id: string): Promise<Book | null> {
    return this.bookModel.findById(id).exec();
  }

  async findBySlug(slug: string): Promise<Book | null> {
    return this.bookModel.findOne({ slug }).exec();
  }

  async update(id: string, updateBookDto: CreateBookDto): Promise<Book | null> {
    const updatedBook = await this.bookModel
      .findByIdAndUpdate(id, updateBookDto, { new: true })
      .exec();
    if (!updatedBook) {
      return null; // Book with the specified ID not found
    }
    return updatedBook;
  }

  async remove(id: string): Promise<Book | null> {
    const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();
    if (!deletedBook) {
      return null; // Book with the specified ID not found
    }
    return deletedBook;
  }
}
