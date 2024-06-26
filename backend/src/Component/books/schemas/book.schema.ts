import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum } from 'class-validator';
import { Document, Types } from 'mongoose';
import { BookGenre } from '../dto/genre-book.dto';
import { BookFormats } from '../dto/format-book.dto';
import { BookDimensions } from '../dto/dimension-book.dto';
import { ImageResponseDto } from '../dto/image-books.dto';

@Schema({ timestamps: true })
export class Book extends Document {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true, default: '' })
  title: string;

  @Prop({ required: true, default: '' })
  author: string;

  @Prop({ required: true })
  @IsEnum(BookGenre)
  genre: BookGenre;

  @Prop({ required: true })
  genre_slug: string;

  @Prop({ required: true, default: '' })
  description: string;

  @Prop({ required: true })
  publicationDate: Date;

  @Prop()
  image: ImageResponseDto;

  @Prop({ required: true, default: '' })
  isbn: string;

  @Prop({ required: true, default: '' })
  publisher: string;

  @Prop({ required: true, default: '' })
  publisherImage: string;

  @Prop({ required: true, default: 0 })
  totalPages: number;

  @Prop({ required: true, default: 0 })
  averageRating: number;

  @Prop({ required: true, default: [] }) // Define the type and default value
  ratings: { userId: string; rating: number }[]; // Array of objects with userId and rating

  @Prop({ required: true, default: '' })
  @IsEnum(BookFormats)
  format: BookFormats;

  @Prop({ required: true, default: 0 })
  price: number;

  @Prop({ required: true, default: 0 })
  quantity: number;

  @Prop({ required: true, default: '' })
  availability: string;

  @Prop()
  tags: [];

  @Prop({ required: true, default: '' })
  references: string;

  @Prop({ required: true, type: Object })
  dimensions: BookDimensions;

  @Prop({ required: true, default: '' })
  weight: string;

  @Prop({ required: true })
  editionDate: Date;

  @Prop({ required: true, default: '' })
  editionLanguage: string;

  @Prop({ required: true, default: '' })
  country: string;

  @Prop({ type: Types.ObjectId, ref: 'users' })
  users: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'categories' })
  categories: Types.ObjectId;

  @Prop({ type: Object }) // Assuming stripe is an object
  stripe: { stripeProductId: string; stripePriceId: string };
}

export const BookSchema = SchemaFactory.createForClass(Book);
export type BookDocument = Book & Document;
