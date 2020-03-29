import { ApiProperty } from '@nestjs/swagger';
import { Matches, MaxLength, MinLength } from 'class-validator';

export abstract class PasswordDto {
  @MinLength(8)
  @MaxLength(32)
  @Matches(/(?=.*[A-Z])/, {
    message: 'Password should contain at least an uppercase letter'
  })
  @Matches(/(?=.*\d)/, {
    message: 'Password should contain at least a digit'
  })
  @Matches(/(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/, {
    message: 'Password should contain at least a special char, like: !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
  })
  @ApiProperty()
  password: string;
}
