import { SuccessResponse } from 'modules/common/common.interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto implements SuccessResponse {
  @ApiProperty({ example: 'true' })
  success: boolean;

  @ApiProperty({ example: 'Usuário criado com sucesso' })
  description: string;
}
