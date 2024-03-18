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

  @Post()
  @UseInterceptors(FilesInterceptor('images', 2)) // Allow uploading two files
  async addBook(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() createBookDto: CreateBookDto,
  ) {
    this.logger.log('Request for add book.');
    const bookImage = images.find((image) => image.fieldname === 'bookImage');
    const coverImage = images.find((image) => image.fieldname === 'coverImage');

    // Pass the images to the service to handle book creation
    return this.booksService.create(createBookDto, bookImage, coverImage);
  }

  @Get()
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Book | null> {
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
