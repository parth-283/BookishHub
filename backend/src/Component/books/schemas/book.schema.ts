import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum } from 'class-validator';
import { Document } from 'mongoose';
import { BookGenre } from '../dto/genre-book.dto';
import { BookFormats } from '../dto/format-book.dto';
import { BookDimensions } from '../dto/dimension-book.dto';

@Schema({ timestamps: true })
export class Book extends Document {
  @Prop({ required: true, default: '' })
  title: string;

  @Prop({ required: true, default: '' })
  author: string;

  @Prop({ required: true, default: '' })
  @IsEnum(BookGenre)
  genre: BookGenre;

  @Prop({ required: true, default: '' })
  description: string;

  @Prop({ required: true })
  publicationDate: Date;

  @Prop({ required: true, default: '' })
  coverImage: string;

  @Prop({ required: true, default: '' })
  isbn: string;

  @Prop({ required: true, default: '' })
  Publisher: string;

  @Prop({ required: true, default: 0 })
  totalPages: number;

  @Prop({ required: true, default: '' })
  @IsEnum(BookFormats)
  format: BookFormats;

  @Prop({ required: true, default: 0 })
  price: number;

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
}

export const BookSchema = SchemaFactory.createForClass(Book);
export type BookDocument = Book & Document;
