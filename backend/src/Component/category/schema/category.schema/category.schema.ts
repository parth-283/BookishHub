// category.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string;

  @Prop({ default: true })
  isVisible: boolean;

  @Prop({ default: 'active' })
  status: string;

  @Prop()
  relatedBooksIds: string[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
