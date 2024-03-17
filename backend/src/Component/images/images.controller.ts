// image.controller.ts

import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteImagesDto } from './dto/delete-image.dto';
import { ImagesService } from './images.service';
import { ApiTags } from '@nestjs/swagger';
import { multerOptions } from 'src/utils/multer.config';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const result = await this.imagesService.uploadImage(file);
    return {  result };
  }

  @Post('delete')
  async deleteImage(@Body() deleteImageDto: DeleteImagesDto): Promise<void> {
    await this.imagesService.deleteImage(deleteImageDto.imageUrl);
  }
}
