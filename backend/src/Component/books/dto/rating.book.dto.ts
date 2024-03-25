import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class AddRatingDto {
  @IsNotEmpty()
  bookId: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}
