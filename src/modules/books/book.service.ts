import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { SuccessResponse } from '@common/common.interfaces';

@Injectable()
export class BookService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async createBook({ title, author, isbn, publishedYear }: CreateBookDto): Promise<SuccessResponse> {
    if (isbn) {
      const existingBook = await this.prisma.book.findUnique({
        where: { isbn },
      });
  
      if (existingBook) {
        throw new BadRequestException('ISBN já está em uso');
      }
    }

    const book = await this.prisma.book.create({
      data: {
        title,
        author,
        isbn,
        publishedYear,
      },
    });

    return { description: 'Livro criado com sucesso', success: true };
  }
}
