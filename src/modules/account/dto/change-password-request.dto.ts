import { ApiProperty } from '@nestjs/swagger';

import { PasswordDto } from './password.dto';

export class ChangePasswordRequestDto extends PasswordDto {
  @ApiProperty()
  oldPassword: string;
}
