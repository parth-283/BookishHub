// user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop()
  id: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: string;

  @Prop()
  firstName: string;

  @Prop()
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

  @Prop({ unique: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  about: string;

  @Prop()
  profileImage: string;

  @Prop()
  books: string[]; // Array of book ids

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
