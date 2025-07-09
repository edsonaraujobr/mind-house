import { AuthSuccessResponse } from '@auth/interfaces/auth.interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}

export class AuthRegisterResponseDto implements AuthSuccessResponse {
  @ApiProperty({ example: 'true' })
  success: boolean;
}
