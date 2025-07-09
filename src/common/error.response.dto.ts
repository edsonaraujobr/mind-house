import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: '2025-07-09T01:07:50.643Z' })
  timestamp: string;

  @ApiProperty({ example: '/auth/register' })
  path: string;

  @ApiProperty({ example: 'POST' })
  method: string;

  @ApiProperty({ example: 'Email já está em uso. Crie um novo email!' })
  error: string;
}
