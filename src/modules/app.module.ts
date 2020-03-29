import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountModule } from './account/account.module';
import { DatabaseModule } from './database/database.module';
import { SignatureModule } from './signature/signature.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ConfigModule.forRoot({ isGlobal: true }), AccountModule, UsersModule, SignatureModule, DatabaseModule]
})
export class AppModule {}
