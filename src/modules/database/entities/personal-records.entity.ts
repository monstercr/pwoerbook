import { Column, Entity } from 'typeorm';

import { DbBaseEntity } from './db-base.entity';

@Entity({ name: 'personal_records' })
export class PersonalRecords extends DbBaseEntity {
  constructor(dto: Partial<PersonalRecords>) {
    super();
    Object.assign(this, dto);
  }

  @Column()
  deadLift: string;

  @Column()
  benchPress: string;

  @Column()
  squat: string;
}
