import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateBookDto, UpdateBookDto } from './dto/index';
import { BookService } from './book.service';
import { Paginated, SuccessResponse } from 'modules/common/common.interfaces';
import {
  SwaggerCreateBookDocs,
  SwaggerDeleteBookByIdDocs,
  SwaggerGetBookByIdDocs,
  SwaggerListBooksDocs,
  SwaggerUpdateBookByIdDocs,
} from './docs/book.docs';
import { BookModel } from './interfaces/book.interfaces';

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

  @SwaggerGetBookByIdDocs()
  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<BookModel> {
    return this.bookService.getBookById(id);
  }

  @SwaggerUpdateBookByIdDocs()
  @Put(':id')
  async updateBookById(@Param('id') id: string, @Body() dto: UpdateBookDto): Promise<BookModel> {
    return this.bookService.updateBookById(id, dto);
  }

  @SwaggerDeleteBookByIdDocs()
  @Delete(':id')
  async deleteBookById(@Param('id') id: string): Promise<SuccessResponse> {
    return this.bookService.deleteBookById(id);
  }
}
