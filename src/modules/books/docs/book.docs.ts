import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiQuery, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { BookDto } from '../dto/book.dto';
import { SuccessResponseDto } from '@common/dto/success.response.dto';
import { ApiErrorExample } from '@common/dto/error.response.dto';
import { PaginatedDto } from '@common/dto/paginated.response.dto';

export function SwaggerCreateBookDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Cria um novo livro' }),
    ApiBody({ type: BookDto }),
    ApiResponse({
      status: 201,
      description: 'Livro criado com sucesso',
      type: SuccessResponseDto,
    }),
    ApiErrorExample({ status: 400, errorMessage: 'ISBN já está em uso', path: '/books', method: 'POST' }),
  );
}

const PaginatedBookDto = PaginatedDto(BookDto);

export function SwaggerListBooksDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Lista livros com paginação' }),
    ApiQuery({ name: 'page', required: false, type: Number, example: 1 }),
    ApiQuery({ name: 'pageSize', required: false, type: Number, example: 10 }),
    ApiExtraModels(BookDto, PaginatedBookDto),
    ApiResponse({
      status: 200,
      description: 'Livros listados com sucesso',
      schema: {
        allOf: [{ $ref: getSchemaPath(PaginatedBookDto) }],
      },
    }),
  );
}
