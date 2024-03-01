import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { BooksService } from './books.service';
import { Book } from './schemas/book.schema';

@Controller('books')
export class BooksController {
  private readonly logger = new Logger(BooksController.name);

  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    this.logger.log('Request for add book.');
    return this.booksService.create(createBookDto);
  }

  @Get()
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Book> {
    return this.booksService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string): string {
    return `This action updates book ${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `This action removes book ${id}`;
  }
}
