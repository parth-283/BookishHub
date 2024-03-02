// create-contact.dto.ts
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateContactDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly phoneNumber?: string;

  @IsString()
  readonly message: string;
}
