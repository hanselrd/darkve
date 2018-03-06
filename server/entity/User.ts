import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({})
  password: string;

  @Column({ type: 'date' })
  dob: Date;

  @Column({ default: 'en' })
  language: 'en' | 'es';

  @Column({ default: false })
  online: boolean;
}
