import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountModule } from '../account/account.module';
import { DatabaseService } from './database.service';
import { PersonalRecords } from './entities/personal-records.entity';
import { UserData } from './entities/user-data.entity';
import { User } from './entities/user.entity';

@Module({
  providers: [DatabaseService],
  imports: [TypeOrmModule.forFeature([User, UserData, PersonalRecords]), AccountModule]
})
export class DatabaseModule {}
