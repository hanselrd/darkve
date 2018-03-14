import { Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import {
  IsAlphanumeric,
  IsDate,
  IsEmail,
  Length,
  MinLength,
  MinDate,
  MaxDate
} from 'class-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Model from './Model';

@Entity()
export default class User extends Model {
  @Column({ unique: true })
  @Length(3, 12)
  @IsAlphanumeric()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @MinLength(6)
  password: string;

  @Column({ type: 'date' })
  @MinDate(new Date('1900-01-01'))
  @MaxDate(new Date())
  @IsDate()
  dob: Date;

  @Column({ default: 1 })
  level: number;

  @Column({ default: 0 })
  gold: number;

  @Column({ default: 10 })
  hp: number;

  @Column({ default: 5 })
  mp: number;

  @Column({ default: 10 })
  maxHp: number;

  @Column({ default: 5 })
  maxMp: number;

  @Column({ default: 0 })
  exp: number;

  @Column({ default: 0 })
  fame: number;

  @Column({ type: 'json', default: { name: '00001', x: 0, y: 0 } })
  map: { name: string; x: number; y: number };

  @Column({ default: 0 })
  gm: number;

  @Column({ default: false })
  online: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  private async _beforeSave() {
    const user = await User.findOneById(this.id);
    if (!user || user.password !== this.password) {
      this.password = await bcrypt.hash(this.password, 15);
    }
  }

  authenticate(password: string) {
    return bcrypt.compare(password, this.password);
  }

  changePassword(password: string) {
    this.password = password;
    return this.save();
  }

  generateToken() {
    return jwt.sign(
      { sub: this.id, iss: process.env.JWT_ISSUER },
      this.password + process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
  }
}
