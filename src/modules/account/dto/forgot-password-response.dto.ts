import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordResponseDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  status: number;
}
