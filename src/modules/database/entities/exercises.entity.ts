import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { DbBaseEntity } from './db-base.entity';
import { Sets } from './sets.entity';
import { Training } from './training.entity';

@Entity({ name: 'exercises' })
export class Exercise extends DbBaseEntity {
  constructor(dto: Partial<Exercise>) {
    super();
    Object.assign(this, dto);
  }

  @Column()
  @Column({ default: 0 })
  userId: number;

  @Column()
  name: string;

  @ManyToOne(
    type => Training,
    training => training.exercises
  )
  training: Training;

  @OneToMany(
    type => Sets,
    sets => sets.exercise
  )
  sets: Sets[];
}
