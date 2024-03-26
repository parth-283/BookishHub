import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { BooksService } from './books.service';
import { Book } from './schemas/book.schema';
import { ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('books')
@Controller('books')
export class BooksController {
  private readonly logger = new Logger(BooksController.name);

  constructor(private readonly booksService: BooksService) {}

  // @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('images')) // Allow uploading two files
  async addBook(
    @UploadedFiles() images: any,
    @Body() createBookDto: CreateBookDto,
  ) {
    this.logger.log('Request for add book.');
    const bookImage = images.find((image) => image.fieldname === 'bookImage');
    // const coverImage = images.find((image) => image.fieldname === 'coverImage');

    // Pass the images to the service to handle book creation
    return this.booksService.create(createBookDto, bookImage);
  }

  @Get()
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get('getByRatings')
  async findByRatings(): Promise<Book[]> {
    return this.booksService.findByRatings();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Book | null> {
    return this.booksService.findOne(id);
  }

  @Get('getBySlug/:slug')
  async findBySlugs(@Param('slug') slug: string): Promise<Book> {
    return this.booksService.findBySlug(slug);
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
