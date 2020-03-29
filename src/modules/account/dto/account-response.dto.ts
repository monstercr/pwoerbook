import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/database/entities/user.entity';

export class AccountResponseDto {
  constructor(dto: User) {
    this.firstName = dto.userData.firstName;
    this.lastName = dto.userData.lastName;
    this.year = dto.userData.year;
    this.country = dto.userData.country;
    this.deadLift = dto.userData.personalRecords.deadLift;
    this.benchPress = dto.userData.personalRecords.benchPress;
    this.squat = dto.userData.personalRecords.squat;
  }

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
