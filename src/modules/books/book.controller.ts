import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateBookDto } from './dto/create-book.dto';
import { BookService } from './book.service';
import { SuccessResponse } from '@common/common.interfaces';
import { SwaggerCreateBookDocs } from './docs/book.docs';

@ApiTags('Book')
@ApiBearerAuth()
@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @SwaggerCreateBookDocs()
  @Post()
  create(@Body() dto: CreateBookDto): Promise<SuccessResponse> {
    return this.bookService.createBook(dto);
  }

}
