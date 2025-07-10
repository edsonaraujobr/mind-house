import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { RegisterDto } from '../dto/auth-register.dto';
import { AuthLoginResponseDto, LoginDto } from '../dto/auth-login.dto';
import { ErrorResponseDto } from 'modules/common/dto/error.response.dto';
import { SuccessResponseDto } from 'modules/common/dto/success.response.dto';

export function SwaggerRegisterDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Cria um novo usuário' }),
    ApiBody({ type: RegisterDto }),
    SuccessResponseDto({
      status: 201,
      description: 'Usuário criado com sucesso',
    }),
    ErrorResponseDto({
      status: 400,
      errorMessage: 'Email já está em uso',
      path: '/auth/register',
      method: 'POST',
    }),
  );
}

export function SwaggerLoginDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Retorna um token para usuário autenticado' }),
    ApiBody({ type: LoginDto }),
    ApiResponse({
      status: 200,
      description: 'Token retornado com sucesso',
      type: AuthLoginResponseDto,
    }),
    ErrorResponseDto({
      status: 400,
      errorMessage: 'Credenciais inválidas!',
      path: '/auth/login',
      method: 'POST',
    }),
  );
}
