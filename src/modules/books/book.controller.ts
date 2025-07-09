import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateBookDto } from './dto/create-book.dto';
import { BookService } from './book.service';
import { SuccessResponse } from '@common/common.interfaces';
import { SwaggerCreateBookDocs } from './docs/book.docs';

@ApiTags('Book')
@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @SwaggerCreateBookDocs()
  @Post()
  register(@Body() dto: CreateBookDto): Promise<SuccessResponse> {
    return this.bookService.createBook(dto);
  }

}
