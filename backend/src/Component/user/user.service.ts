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
import Stripe from 'stripe';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
  });
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
    // Find the user by userId in your database
    const user = await this.userModel.findOne({ id: userId }).exec();
    if (!user) {
      // Throw an error if user is not found
      throw new NotFoundException('User not found');
    }

    // Find the book by bookId in your database
    const book = await this.bookModel.findOne({ id: bookId }).exec();
    if (!book) {
      // Throw an error if book is not found
      throw new NotFoundException('Book not found');
    }

    // Calculate total price based on the book's price and quantity
    const totalPrice = book.price * quantity;

    // Create a product on Stripe
    const product = await this.stripe.products.create({
      name: book.title, // Name of the product is set to the book title
      description: book.description, // Description of the product can be the book's description
      // You can add more details to the product if needed
    });

    // Set the price for the product on Stripe
    const price = await this.stripe.prices.create({
      product: product.id, // Product ID is used to associate the price with the product
      unit_amount: totalPrice * 100, // Stripe requires amount in cents, so multiply by 100
      currency: 'usd', // Change to your currency if needed
      // You can add more options to the price if needed
    });

    // Check if the book is already in the user's cart
    const existingCartItemIndex = user.cart.findIndex(
      (item) => item.bookId === bookId,
    );

    if (existingCartItemIndex !== -1) {
      // If the book is already in the cart, update the quantity and total price
      user.cart[existingCartItemIndex].quantity += quantity;
      user.cart[existingCartItemIndex].totalPrice += totalPrice;
      // Associate the Stripe product and price IDs with the cart item
      user.cart[existingCartItemIndex].stripeProductId = product.id;
      user.cart[existingCartItemIndex].stripePriceId = price.id;
    } else {
      // If the book is not in the cart, add it to the cart with quantity, total price,
      // and Stripe product and price IDs
      user.cart.push({
        bookId,
        quantity,
        totalPrice,
        stripeProductId: product.id,
        stripePriceId: price.id,
      });
    }

    // Save the user's cart in the database
    await user.save();
    // Return the book that was added to the cart
    return book;
  }

  async removeFromCart(userId: string, bookId: string): Promise<void> {
    // Find the user by userId in your database
    const user = await this.userModel.findOne({ id: userId }).exec();
    if (!user) {
      // Throw an error if user is not found
      throw new NotFoundException('User not found');
    }

    // Find the index of the book in the user's cart
    const index = user.cart.findIndex((item) => item.bookId === bookId);
    if (index === -1) {
      // If the book is not in the cart, throw an error
      throw new NotFoundException('Book not found in cart');
    }

    // Remove the book from the user's cart
    const removedItem = user.cart.splice(index, 1)[0];

    // If the removed item has associated Stripe product and price IDs
    if (removedItem.stripeProductId && removedItem.stripePriceId) {
      try {
        // Delete the product from Stripe
        await this.stripe.products.del(removedItem.stripeProductId);
        // Delete the price from Stripe
        await this.stripe.prices.retrieve(removedItem.stripePriceId);
      } catch (error) {
        // Log any errors that occur during Stripe deletion
        console.error(
          'Error deleting product/price from Stripe:',
          error.message,
        );
        // Optionally, you can throw an error or handle it based on your requirements
      }
    }

    // Save the updated user's cart in the database
    await user.save();
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
