import { IsString, IsEmail, IsBoolean } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  callbackUrl: string;

  @IsString()
  csrfToken: string;

  @IsBoolean()
  redirect: boolean;
}
