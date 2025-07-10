import { ApiProperty } from '@nestjs/swagger';
import { BookModel } from '../interfaces/book.interfaces';

export class GetBookDto implements BookModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  isbn?: string;

  @ApiProperty()
  publishedYear: number;
}
