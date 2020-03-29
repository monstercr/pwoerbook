import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoles } from 'src/core/enums/user-roles.enum';
import { UserStatus } from 'src/core/enums/user-status.enum';
import { Repository } from 'typeorm';

import { PasswordService } from '../account/password.service';
import { User } from '../database/entities/user.entity';
import { PersonalRecords } from './entities/personal-records.entity';
import { UserData } from './entities/user-data.entity';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserData) private readonly userDataRepository: Repository<UserData>,
    @InjectRepository(PersonalRecords) private readonly personalRecordsRepository: Repository<PersonalRecords>,
    private readonly configService: ConfigService,
    private readonly passwordService: PasswordService
  ) {}

  private async seedSuperAdmin(): Promise<User> {
    const superAdminEmail = this.configService.get<string>('SUPER_ADMIN_EMAIL');
    const superAdminPassword = this.configService.get<string>('SUPER_ADMIN_PASSWORD');

    const result = await this.getSuperAdmin();
    if (!result) {
      const admin = this.userRepository.create({
        email: superAdminEmail,
        password: await this.passwordService.hashPassword(superAdminPassword),
        status: UserStatus.ACTIVATE,
        role: UserRoles.SUPER_ADMIN
      });
      await this.userRepository.save(admin);
      return Promise.resolve(admin);
    }
    return Promise.resolve(result);
  }

  private async getSuperAdmin(): Promise<User> {
    const superAdminEmail = this.configService.get<string>('SUPER_ADMIN_EMAIL');
    return await this.userRepository.findOne({
      where: [{ email: superAdminEmail }]
    });
  }

  async seedData() {
    await this.seedSuperAdmin();
  }
}
