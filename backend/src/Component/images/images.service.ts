import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';

@Injectable()
export class ImagesService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<any> {
    try {
      const result = await cloudinary.uploader.upload(file.path);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteImage(imageUrl: string): Promise<void> {
    // Extract public_id from Cloudinary URL
    const publicId = imageUrl.substring(
      imageUrl.lastIndexOf('/') + 1,
      imageUrl.lastIndexOf('.'),
    );

    try {
      // Delete image from Cloudinary
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      // Handle deletion error
      throw new Error('Failed to delete image from Cloudinary');
    }
  }
}
function reject(error: UploadApiErrorResponse) {
  throw new Error('Function not implemented.');
}

function resolve(result: UploadApiResponse) {
  throw new Error('Function not implemented.');
}
