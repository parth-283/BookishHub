// admin.module.ts
import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UserModule } from '../user/user.module';
import { BooksModule } from '../books/books.module';
import { ContactModule } from '../contact/contact.module';

@Module({
  imports: [UserModule, BooksModule, ContactModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
