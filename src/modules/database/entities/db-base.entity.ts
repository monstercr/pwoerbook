import { BeforeInsert, BeforeUpdate, Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class DbBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdOn: Date;

  @Column({ nullable: true })
  modifiedOn?: Date;

  @BeforeUpdate()
  setUpdatedOn() {
    this.modifiedOn = new Date();
  }

  @BeforeInsert()
  setCreatedOn() {
    this.createdOn = new Date();
  }
}
