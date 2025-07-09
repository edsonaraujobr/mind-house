import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export function PaginatedDto<T>(classRef: Type<T>) {
  class PaginatedResponseDto {
    @ApiProperty({ type: [classRef] })
    nodes: T[];

    @ApiProperty()
    totalCount: number;

    @ApiProperty()
    page: number;

    @ApiProperty()
    pageSize: number;

    @ApiProperty()
    hasNextPage: boolean;

    @ApiProperty({ required: false })
    nextSkip?: number;
  }

  return PaginatedResponseDto;
}
