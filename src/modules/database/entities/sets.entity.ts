import { Column, Entity, ManyToOne } from 'typeorm';

import { DbBaseEntity } from './db-base.entity';
import { Exercise } from './exercises.entity';

@Entity({ name: 'exercises' })
export class Sets extends DbBaseEntity {
  constructor(dto: Partial<Sets>) {
    super();
    Object.assign(this, dto);
  }

  @Column()
  reps: number;

  @ManyToOne(
    type => Exercise,
    exercise => exercise.sets
  )
  exercise: Exercise;
}
