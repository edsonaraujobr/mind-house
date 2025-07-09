import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BookDto } from './dto/book.dto';
import { BookService } from './book.service';
import { Paginated, SuccessResponse } from '@common/common.interfaces';
import { SwaggerCreateBookDocs, SwaggerListBooksDocs } from './docs/book.docs';
import { BookModel } from './interfaces/book.interfaces';

@ApiTags('Book')
@ApiBearerAuth()
@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @SwaggerCreateBookDocs()
  @Post()
  create(@Body() dto: BookDto): Promise<SuccessResponse> {
    return this.bookService.createBook(dto);
  }

  @SwaggerListBooksDocs()
  @Get()
  async listBooks(
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '10',
  ): Promise<Paginated<BookModel>> {
    const pageNumber = parseInt(page);
    const pageSizeNumber = parseInt(pageSize);
    return this.bookService.listBooks(pageNumber, pageSizeNumber);
  }
}
