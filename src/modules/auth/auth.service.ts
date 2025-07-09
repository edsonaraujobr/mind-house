import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RegisterDto } from './dto/auth-register.dto';
import { LoginDto } from './dto/auth-login.dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../jwt/jwt.service';
import { AuthTokenResponse } from './interfaces/auth.interfaces';
import { SuccessResponse } from '@common/common.interfaces';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private tokenService: TokenService,
  ) {}

  async register({ email, password }: RegisterDto): Promise<SuccessResponse> {
    const userExists = await this.prisma.user.findUnique({ where: { email } });

    if (userExists) {
      throw new BadRequestException(
        'Email já está em uso. Crie um novo email!',
      );
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: { email, password: hash },
    });

    const token = await this.tokenService.generateToken({
      id: user.id,
      email: user.email,
    });

    return { success: true, description: 'Usuário criado com sucesso!'};
  }

  async login({ email, password }: LoginDto): Promise<AuthTokenResponse> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException(
        'Credenciais inválidas. Tente novamente!',
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException(
        'Credenciais inválidas. Tente novamente!',
      );
    }

    const token = await this.tokenService.generateToken({
      id: user.id,
      email: user.email,
    });
    return { accessToken: token };
  }
}
