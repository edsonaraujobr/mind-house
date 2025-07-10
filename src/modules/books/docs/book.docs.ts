import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiQuery,
  ApiExtraModels,
  getSchemaPath,
  ApiParam,
} from '@nestjs/swagger';
import { BookDto } from '../dto/book.dto';
import { SuccessResponseDto } from 'modules/common/dto/success.response.dto';
import { ApiErrorExample } from 'modules/common/dto/error.response.dto';
import { PaginatedDto } from 'modules/common/dto/paginated.response.dto';

export function SwaggerCreateBookDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Cria um novo livro' }),
    ApiBody({ type: BookDto }),
    ApiResponse({
      status: 201,
      description: 'Livro criado com sucesso',
      type: SuccessResponseDto,
    }),
    ApiErrorExample({
      status: 400,
      errorMessage: 'ISBN já está em uso',
      path: '/books',
      method: 'POST',
    }),
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

export function SwaggerGetBookByIdDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Obtém um livro pelo ID' }),
    ApiParam({
      name: 'id',
      required: true,
      description: 'ID do livro (UUID)',
      example: 'ae8e014f-6e61-487e-96f1-754103acb971',
    }),
    ApiResponse({
      status: 200,
      description: 'Livro encontrado com sucesso',
      type: BookDto,
    }),
    ApiErrorExample({
      status: 400,
      errorMessage: 'Livro não encontrado',
      path: '/books/{id}',
      method: 'GET',
    }),
  );
}

export function SwaggerDeleteBookByIdDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Remove um livro pelo ID' }),
    ApiParam({
      name: 'id',
      required: true,
      description: 'ID do livro (UUID)',
      example: 'ae8e014f-6e61-487e-96f1-754103acb971',
    }),
    ApiResponse({
      status: 200,
      description: 'Livro deletado com sucesso',
      type: BookDto,
    }),
    ApiErrorExample({
      status: 400,
      errorMessage: 'Livro não encontrado',
      path: '/books/{id}',
      method: 'DELETE',
    }),
  );
}
