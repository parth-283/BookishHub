// user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { BookDocument } from 'src/Component/books/schemas/book.schema';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  country: string;

  @Prop()
  dob: Date;

  @Prop()
  address: string;

  @Prop()
  phone: string;

  @Prop()
  about: string;

  @Prop()
  profileImage: [];

  @Prop()
  coverImage: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }] })
  books: BookDocument[];

  @Prop({ type: [String], default: [] }) // Array of strings for comments
  comments: string[];

  @Prop({
    type: [
      {
        bookId: { type: String, required: true },
        rating: { type: Number, required: true },
      },
    ],
    default: [],
  }) // Array of objects for ratings
  ratings: { bookId: string; rating: number }[];

  @Prop()
  tokenHistory: {
    createdDate: Date;
    token: string;
    isValid: boolean;
  }[];
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
