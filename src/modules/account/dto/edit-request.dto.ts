import { ApiProperty } from '@nestjs/swagger';

export class EditRequestDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  country: string;

  @ApiProperty()
  deadLift: string;

  @ApiProperty()
  benchPress: string;

  @ApiProperty()
  squat: string;
}
