// images.module.ts

import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryProvider } from 'src/utils/cloudinary.provider';

@Module({
  imports: [ConfigModule],
  providers: [CloudinaryProvider, ImagesService], // Ensure ImagesService is provided here
  exports: [CloudinaryProvider, ImagesService], // Export ImagesService if you need to use it in other modules
})
export class ImagesModule {}
