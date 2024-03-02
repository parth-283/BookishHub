// update-contact.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from '../create-contact.dto/create-contact.dto';

export class UpdateContactDto extends PartialType(CreateContactDto) {}
