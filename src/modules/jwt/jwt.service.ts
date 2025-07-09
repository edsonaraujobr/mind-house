import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private jwt: JwtService) {}

  async generateToken(payload: {
    id: string;
    email: string;
  }): Promise<string> {
    return this.jwt.signAsync({ sub: payload.id, email: payload.email });
  }
}
