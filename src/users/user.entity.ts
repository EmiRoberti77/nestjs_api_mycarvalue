import { Exclude } from 'class-transformer';
import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  @Exclude()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('inserted', this.email, 'user', this.id);
  }

  @AfterRemove()
  logAfterRemove() {
    console.log('removed', this.email, 'user');
  }

  @AfterUpdate()
  logAfterUpdate() {
    console.log('updated', this.email, 'user');
  }
}
