import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthRegisterResponseDto, RegisterDto } from '../dto/auth-register.dto';
import { AuthLoginResponseDto, LoginDto } from '../dto/auth-login.dto';
import { ErrorResponseDto } from '@common/error.response.dto';

export function SwaggerRegisterDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Cria um novo usuário' }),
    ApiBody({ type: RegisterDto }),
    ApiResponse({
      status: 201,
      description: 'Usuário criado com sucesso',
      type: AuthRegisterResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Email já está em uso',
      type: ErrorResponseDto
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
    ApiResponse({
      status: 401,
      description: 'Credenciais inválidas',
      type: ErrorResponseDto
    }),
  );
}
