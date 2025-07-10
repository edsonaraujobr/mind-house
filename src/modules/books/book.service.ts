import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateBookDto, UpdateBookDto } from './dto/index';
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
  }: CreateBookDto): Promise<SuccessResponse> {
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

  async updateBookById(id: string, dto: UpdateBookDto): Promise<BookModel> {
    const book = await this.prisma.book.findUnique({ where: { id } });
    
    if (!book) {
      throw new NotFoundException('Livro não encontrado');
    }

    const bookUpdated = await this.prisma.book.update({
      where: { id },
      data: dto,
      select: {
        id: true,
        title: true,
        author: true,
        isbn: true,
        publishedYear: true,
      }
    });

    return bookUpdated;
  }

    
  async deleteBookById(id: string): Promise<SuccessResponse> {
    const book = await this.prisma.book.findUnique({ where: { id } });
    
    if (!book) {
      throw new NotFoundException('Livro não encontrado');
    }
    
    await this.prisma.book.delete({ where: { id } });
  
    return { success: true, description: 'Livro deletado com sucesso' };
  }
}
