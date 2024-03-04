// category.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({ required: true })
  categoryName: string;

  @Prop({ required: true })
  categoryShortDescription: string;

  @Prop({ required: true })
  unsplashImageURL: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
