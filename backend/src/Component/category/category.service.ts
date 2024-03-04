// category.service.ts

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Category,
  CategoryDocument,
} from './schema/category.schema/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  async findAll(): Promise<Category[]> {
    try {
      return this.categoryModel.find().exec();
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneBySlug(slug: string): Promise<Category> {
    return this.categoryModel.findOne({ slug: slug }).populate('books').exec();
  }

  async findOneByID(id: string): Promise<Category> {
    return this.categoryModel.findOne({ id: id }).exec();
  }

  async update(
    id: string,
    updateCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Category> {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }
}
