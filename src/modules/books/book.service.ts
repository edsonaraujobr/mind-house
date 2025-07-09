import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { BookDto } from './dto/book.dto';
import { Paginated, SuccessResponse } from 'modules/common/common.interfaces';
import { BookModel } from './interfaces/book.interfaces';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async createBook({
    title,
    author,
    isbn,
    publishedYear,
  }: BookDto): Promise<SuccessResponse> {
    if (isbn) {
      const existingBook = await this.prisma.book.findUnique({
        where: { isbn },
      });

      if (existingBook) {
        throw new BadRequestException('ISBN já está em uso');
      }
    }

    await this.prisma.book.create({
      data: {
        title,
        author,
        isbn,
        publishedYear,
      },
    });

    return { description: 'Livro criado com sucesso', success: true };
  }

  async listBooks(
    page: number,
    pageSize: number,
  ): Promise<Paginated<BookModel>> {
    const skip = (page - 1) * pageSize;

    const [totalCount, nodes] = await Promise.all([
      this.prisma.book.count(),
      this.prisma.book.findMany({
        skip,
        take: pageSize,
        select: {
          id: true,
          title: true,
          author: true,
          isbn: true,
          publishedYear: true,
        },
      }),
    ]);

    const hasNextPage = skip + nodes.length < totalCount;
    const nextSkip = hasNextPage ? skip + nodes.length : undefined;

    return {
      nodes,
      totalCount,
      page,
      pageSize,
      hasNextPage,
      nextSkip,
    };
  }

  async getBookById(id: string): Promise<BookModel> {
    const book = await this.prisma.book.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        author: true,
        isbn: true,
        publishedYear: true,
      },
    });

    if (!book) {
      throw new BadRequestException('Livro não encontrado');
    }

    return book;
  }
}
