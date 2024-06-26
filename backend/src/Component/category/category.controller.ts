// category.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './schema/category.schema/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto/create-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get('pagination')
  findAllByPagination(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ data: Category[]; totalPages: number }> {
    return this.categoryService.findAllByPagination(page, limit);
  }

  @Get('getBySlug/:slug')
  findOneBySlug(
    @Param('slug') slug: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ data: Category; totalPages: number }> {
    return this.categoryService.findOneBySlug(slug, page, limit);
  }

  @Get('getById/:id')
  findOneById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findOneByID(id);
  }

  @Get('categoryList')
  categoryList(): Promise<Category[]> {
    return this.categoryService.getAllCategoryList();
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Category> {
    return this.categoryService.remove(id);
  }
}
