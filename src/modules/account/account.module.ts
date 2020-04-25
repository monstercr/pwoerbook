import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { jwtConstants } from '../../core/constans/jwt-secrets';
import { PersonalRecords } from '../database/entities/personal-records.entity';
import { UserData } from '../database/entities/user-data.entity';
import { User } from '../database/entities/user.entity';
import { SenderModule } from '../sender/sender.module';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { JwtStrategy } from './jwt.strategy';
import { PasswordService } from './password.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserData, PersonalRecords]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '86400s' }
    }),
    SenderModule
  ],
  controllers: [AccountController],
  providers: [AccountService, JwtStrategy, PasswordService],
  exports: [PasswordService]
})
export class AccountModule {}
