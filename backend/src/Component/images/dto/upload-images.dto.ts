import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UploadImagesDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  file: any;
}
