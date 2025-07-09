import { ApiProperty, ApiResponse } from '@nestjs/swagger';

export function ApiErrorExample({
  status,
  errorMessage,
  path = '/example',
  method = 'POST',
}: {
  status: number;
  errorMessage: string;
  path: string;
  method: string;
}) {
  return ApiResponse({
    status,
    description: errorMessage,
    schema: {
      example: {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path,
        method,
        error: errorMessage,
      },
    },
  });
}
