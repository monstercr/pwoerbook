import { ApiProperty } from '@nestjs/swagger';
import { IsHexadecimal, IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

import { PasswordDto } from './password.dto';

export class ResetPasswordRequestDto extends PasswordDto {
  @IsNotEmpty()
  @IsHexadecimal()
  @ApiProperty()
  token: string;
}
