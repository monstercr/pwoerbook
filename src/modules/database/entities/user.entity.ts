import { UserRoles } from 'src/core/enums/user-roles.enum';
import { UserStatus } from 'src/core/enums/user-status.enum';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { DbBaseEntity } from './db-base.entity';
import { UserData } from './user-data.entity';

@Entity({ name: 'users' })
export class User extends DbBaseEntity {
  constructor(dto: Partial<User>) {
    super();
    Object.assign(this, dto);
  }

  @Column({ length: 200 })
  email: string;

  @Column({ length: 200 })
  password: string;

  @Column()
  status: UserStatus;

  @Column()
  role: UserRoles;

  @OneToOne(() => UserData, { nullable: true })
  @JoinColumn()
  userData?: UserData;
}
