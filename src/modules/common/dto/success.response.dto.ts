import { ApiResponse } from '@nestjs/swagger';

export function SuccessResponseDto({
  status,
  success = true,
  description,
}: {
  status: number;
  success?: boolean;
  description: string;
}) {
  return ApiResponse({
    status,
    description,
    schema: {
      example: {
        success,
        description
      },
    },
  });
}
