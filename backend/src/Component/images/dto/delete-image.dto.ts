import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteImagesDto {
  @ApiProperty()
  @IsNotEmpty()
  imageUrl: string;
}
