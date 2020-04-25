import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountModule } from './account/account.module';
import { DatabaseModule } from './database/database.module';
import { SenderModule } from './sender/sender.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ConfigModule.forRoot({ isGlobal: true }), AccountModule, UsersModule, DatabaseModule, SenderModule]
})
export class AppModule {}
