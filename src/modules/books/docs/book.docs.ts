import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateBookDto } from '../dto/create-book.dto';
import { SuccessResponseDto } from '@common/dto/success.response.dto';
import { ApiErrorExample } from '@common/dto/error.response.dto';

export function SwaggerCreateBookDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Cria um novo livro' }),
    ApiBody({ type: CreateBookDto }),
    ApiResponse({
      status: 201,
      description: 'Livro criado com sucesso',
      type: SuccessResponseDto,
    }),
    ApiErrorExample({ status: 400, errorMessage: 'ISBN já está em uso', path: '/books', method: 'POST' }),
  );
}
