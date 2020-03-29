import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { DbBaseEntity } from './db-base.entity';
import { PersonalRecords } from './personal-records.entity';

@Entity({ name: 'user_data' })
export class UserData extends DbBaseEntity {
  constructor(dto: Partial<UserData>) {
    super();
    Object.assign(this, dto);
  }

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  year: number;

  @Column()
  country: string;

  @OneToOne(() => PersonalRecords, { nullable: true })
  @JoinColumn()
  personalRecords?: PersonalRecords;
}
