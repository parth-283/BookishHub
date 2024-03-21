// admin.module.ts
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { BooksModule } from '../books/books.module';
import { ContactModule } from '../contact/contact.module';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

@Module({
  imports: [UserModule, BooksModule, ContactModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
