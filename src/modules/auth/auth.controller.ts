import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/auth-register.dto';
import { LoginDto } from './dto/auth-login.dto';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerLoginDocs, SwaggerRegisterDocs } from './docs/auth.docs';
import { Public } from 'modules/common/public.decorator';
import { SuccessResponse } from 'modules/common/common.interfaces';
import { AuthTokenResponse } from './interfaces/auth.interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @SwaggerRegisterDocs()
  @Post('register')
  register(@Body() dto: RegisterDto): Promise<SuccessResponse> {
    return this.authService.register(dto);
  }

  @Public()
  @SwaggerLoginDocs()
  @Post('login')
  login(@Body() dto: LoginDto): Promise<AuthTokenResponse> {
    return this.authService.login(dto);
  }
}
