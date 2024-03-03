import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { Book, BookDocument } from './schemas/book.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BooksService {
  private readonly logger = new Logger(BooksService.name);

  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  generateUUID(): string {
    const id: string = uuidv4();
    return id;
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const slug = createBookDto.title.toLowerCase().split(' ').join('-');

    const createdbook = new this.bookModel({
      ...createBookDto,
      id: this.generateUUID(),
      slug: slug,
    });

    const createdBook = new this.bookModel(createdbook);
    this.logger.log('Book added successfully.');
    return createdBook.save();
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
