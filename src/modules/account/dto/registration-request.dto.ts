import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

import { PasswordDto } from './password.dto';

export class RegistrationRequestDto extends PasswordDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName?: string;

  @ApiProperty()
  lastName?: string;

  @ApiProperty()
  year?: number;

  @ApiProperty()
  country?: string;

  @ApiProperty()
  deadLift?: string;

  @ApiProperty()
  squat?: string;

  @ApiProperty()
  benchPress?: string;
}
