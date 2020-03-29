import { ApiProperty } from '@nestjs/swagger';

export class EditResponseDto {
  @ApiProperty()
  status: number;
}
