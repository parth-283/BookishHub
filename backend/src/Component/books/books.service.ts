import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
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
import { ImagesService } from '../images/images.service';

@Injectable()
export class BooksService {
  private readonly logger = new Logger(BooksService.name);

  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly imagesService: ImagesService,
  ) {}

  generateUUID(): string {
    const id: string = uuidv4();
    return id;
  }

  async create(
    createBookDto: CreateBookDto,
    bookImage: Express.Multer.File,
  ): Promise<any> {
    try {
      const { userId, categoryId } = createBookDto;

      const slug = createBookDto.title.toLowerCase().split(' ').join('-');

      this.logger.log('Upload book picture.');
      const bookImageResult = await this.imagesService.uploadImage(bookImage);

      const userResult = await this.userModel.findOne({ id: userId });

      const categoryResult = await this.categoryModel.findOne({
        id: categoryId,
      });

      // Create a new book
      const createdbook = new this.bookModel({
        ...createBookDto,
        id: this.generateUUID(),
        slug: slug,
        image: bookImageResult,
        genre_slug: categoryResult.slug,
        publicationDate: new Date(),
        publisherImage: userResult?.profileImage.secure_url || '',
        publisher: userResult?.firstName + ' ' + userResult?.lastName || '',
      });

      const createdBook = new this.bookModel(createdbook);

      this.logger.log('Book added successfully.');

      // Add book ID to user's list of books
      this.logger.log('Add book on user by id:', userId);

      await this.userModel.findByIdAndUpdate(
        { _id: userResult._id },
        {
          $push: { books: createdBook._id },
        },
      );

      // Add book ID to category's list of books
      this.logger.log('Add book on category by id:', categoryId);

      await this.categoryModel.findByIdAndUpdate(
        { _id: categoryResult._id },
        {
          $push: { books: createdBook._id },
        },
      );

      await createdBook.save();

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

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: Book[]; totalPages: number }> {
    try {
      const skip = (page - 1) * limit;

      const data = await this.bookModel.find().skip(skip).limit(limit).exec();

      const totalCount = await this.bookModel.countDocuments().exec();
      const totalPages = Math.ceil(totalCount / limit);

      return { data: data, totalPages: totalPages };
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<Book | null> {
    return await this.bookModel.findById({ id: id }).exec();
  }

  async findById(id: string): Promise<Book | null> {
    return await this.bookModel.findOne({ id: id }).exec();
  }

  async findBySlug(slug: string): Promise<Book | null> {
    return await this.bookModel.findOne({ slug }).exec();
  }

  async findByRatings(): Promise<Book[]> {
    this.logger.log('Geting books data by ratings.');
    // return await this.bookModel.find().limit(6).exec();
    const books = await this.bookModel
      .find()
      .sort({ rating: -1 })
      .limit(8)
      .populate('categories')
      .exec();
    return books;
  }

  async update(
    id: string,
    updateBookDto: CreateBookDto | Book,
  ): Promise<Book | null> {
    const updatedBook = await this.bookModel
      .findOneAndUpdate({ id: id }, updateBookDto, { new: true })
      .exec();
    if (!updatedBook) {
      return null;
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

  async updateBookWithStripeData(
    bookId: string,
    productId: string,
    priceId: string,
  ): Promise<Book> {
    const updatedBook = await this.bookModel.findOneAndUpdate(
      { id: bookId },
      {
        $set: {
          stripe: { stripeProductId: productId, stripePriceId: priceId },
        },
      },
      { new: true },
    );

    return updatedBook;
  }
}
