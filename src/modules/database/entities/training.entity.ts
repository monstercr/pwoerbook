import { Column, Entity, OneToMany } from 'typeorm';

import { DbBaseEntity } from './db-base.entity';
import { Exercise } from './exercises.entity';

@Entity({ name: 'trainings' })
export class Training extends DbBaseEntity {
  constructor(dto: Partial<Training>) {
    super();
    Object.assign(this, dto);
  }

  @Column({ length: 50 })
  title: string;

  @OneToMany(
    type => Exercise,
    exercises => exercises.training
  )
  exercises: Exercise[];
}
