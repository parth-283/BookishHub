import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { BooksService } from './books.service';
import { Book } from './schemas/book.schema';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import multerOptions from '../../utils/multer.config';
import { JwtAuthGuard } from '../../guard/jwt-auth/jwt-auth.guard';

@ApiTags('books')
@Controller('books')
export class BooksController {
  private readonly logger = new Logger(BooksController.name);

  constructor(private readonly booksService: BooksService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async addBook(
    @UploadedFile() file: Express.Multer.File,
    @Body() createBookDto: CreateBookDto,
  ) {
    this.logger.log('Request for add book.');

    // Pass the images to the service to handle book creation
    return this.booksService.create(createBookDto, file);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ data: Book[]; totalPages: number }> {
    return this.booksService.findAll(page, limit);
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
