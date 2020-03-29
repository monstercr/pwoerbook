import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoles } from 'src/core/enums/user-roles.enum';
import { UserStatus } from 'src/core/enums/user-status.enum';
import { Repository } from 'typeorm';

import { PersonalRecords } from '../database/entities/personal-records.entity';
import { UserData } from '../database/entities/user-data.entity';
import { User } from '../database/entities/user.entity';
import { AccountResponseDto } from './dto/account-response.dto';
import { EditRequestDto } from './dto/edit-request.dto';
import { EditResponseDto } from './dto/edit-response.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { RegistrationRequestDto } from './dto/registration-request.dto';
import { RegistrationResponseDto } from './dto/registration-response.dto';
import { IJwtTokenData } from './interfaces/jwt-token-data.interface';
import { ITokenResponse } from './interfaces/token-response.interface';
import { PasswordService } from './password.service';

@Injectable()
export class AccountService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(PersonalRecords) private readonly personalRecordsRepository: Repository<PersonalRecords>,
    @InjectRepository(UserData) private readonly userDataRepository: Repository<UserData>
  ) {}

  async getJwtToken(tokenData: IJwtTokenData): Promise<string> {
    const token = this.jwtService.sign(tokenData);
    if (!token) {
      throw new BadRequestException('Problem during generate JWT token');
    }
    return token;
  }

  async get(userId: number): Promise<AccountResponseDto> {
    const userProfile = await this.userRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.userData', 'userData')
      .leftJoinAndSelect('userData.personalRecords', 'personalRecords')
      .where('users.id = :id', { id: userId })
      .getOne();
    if (!userProfile) {
      throw new BadRequestException('User does not exist');
    }
    return new AccountResponseDto(userProfile);
  }

  async login(userRequest: LoginRequestDto): Promise<ITokenResponse> {
    const user = await this.userRepository
      .createQueryBuilder('users')
      .where('email = :email', { email: userRequest.email })
      .getOne();
    if (!user) {
      throw new BadRequestException('User does not exist');
    }
    if (user.status === UserStatus.DEACTIVATED) {
      throw new BadRequestException({
        message: 'Your account has been deactivated',
        accountInactive: true
      });
    }
    const isCorrectPassword = await this.passwordService.comparePassword(userRequest.password, user.password);
    if (!isCorrectPassword) {
      throw new BadRequestException('User does not exist or password incorrect');
    }
    const token = await this.getJwtToken({
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status
    });

    return {
      accessToken: token
    };
  }

  async register(dto: RegistrationRequestDto): Promise<RegistrationResponseDto> {
    const existedUser = await this.userRepository
      .createQueryBuilder('users')
      .where('email = :email', { email: dto.email })
      .getOne();
    if (existedUser) {
      throw new BadRequestException('User already exist');
    }

    const personalRecords = this.personalRecordsRepository.create({
      deadLift: dto.deadLift,
      benchPress: dto.benchPress,
      squat: dto.squat
    });
    await this.personalRecordsRepository.save(personalRecords);

    const userData = this.userDataRepository.create({
      country: dto.country,
      year: dto.year,
      firstName: dto.firstName,
      lastName: dto.lastName,
      personalRecords
    });
    await this.userDataRepository.save(userData);

    const user = this.userRepository.create({
      email: dto.email,
      userData,
      password: await this.passwordService.hashPassword(dto.password),
      status: UserStatus.ACTIVATE,
      role: UserRoles.USER
    });
    const values = await this.userRepository.save(user);
    return new RegistrationResponseDto(values);
  }

  async edit(userId: number, data: EditRequestDto): Promise<EditResponseDto> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userData', 'userData')
      .leftJoinAndSelect('userData.personalRecords', 'personalRecords')
      .where('user.id = :id', { id: userId })
      .getOne();

    user.userData.firstName = data.firstName;
    user.userData.lastName = data.lastName;
    user.userData.year = data.year;
    user.userData.country = data.country;
    user.userData.personalRecords.benchPress = data.benchPress;
    user.userData.personalRecords.deadLift = data.deadLift;

    const result = await this.userRepository.update({ id: userId }, { ...user });

    if (!result) {
      throw new BadRequestException();
    }
    return {
      status: HttpStatus.ACCEPTED
    };
  }
}
