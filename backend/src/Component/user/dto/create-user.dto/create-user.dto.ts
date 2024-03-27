export class CreateUserDto {
  id: string;
  slug: string;
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  country: string;
  bod: Date;
  address: string;
  email: string;
  isValid: boolean;
  phone: string;
  about: string;
  profileImage: string;
  password: string;
}
