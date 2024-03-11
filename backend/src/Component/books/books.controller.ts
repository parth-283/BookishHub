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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('books')
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
  async findOne(@Param('id') id: string): Promise<Book> {
    return this.booksService.findOne(id);
  }

  @Get('getBySlug/:slug')
  async findBySlugs(@Param('slug') slug: string): Promise<Book> {
    return this.booksService.findBySlug(slug);
  }

  @Get('getByRatings')
  async findByRatings(): Promise<Book[]> {
    return this.booksService.findByRatings();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: CreateBookDto,
  ): Promise<Book | null> {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Book | null> {
    return this.booksService.remove(id);
  }
}
