import bcrypt from 'bcrypt';
import {
  IsAlphanumeric,
  IsDate,
  IsEmail,
  Length,
  MaxDate,
  MinDate,
  MinLength
} from 'class-validator';
import jwt from 'jsonwebtoken';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import Model from './model';

@Entity()
export default class User extends Model {
  @Column({ unique: true })
  @Length(3, 12)
  @IsAlphanumeric()
  public name!: string;

  @Column({ unique: true })
  @IsEmail()
  public email!: string;

  @Column()
  @MinLength(6)
  public password!: string;

  @Column({ type: 'date' })
  @MinDate(new Date('1900-01-01'))
  @MaxDate(new Date())
  @IsDate()
  public dob!: Date;

  @Column({ default: 1 })
  public level!: number;

  @Column({ default: 0 })
  public gold!: number;

  @Column({ default: 10 })
  public hp!: number;

  @Column({ default: 5 })
  public mp!: number;

  @Column({ default: 10 })
  public maxHp!: number;

  @Column({ default: 5 })
  public maxMp!: number;

  @Column({ default: 0 })
  public exp!: number;

  @Column({ default: 0 })
  public fame!: number;

  // Not supported in sqlite
  // @Column({ type: 'json', default: { name: '00001', x: 0, y: 0 } })
  // public map!: { name: string; x: number; y: number };

  @Column({ default: 0 })
  public gm!: number;

  @Column({ default: false })
  public online!: boolean;
  public authenticate(password: string) {
    return bcrypt.compare(password, this.password);
  }

  public changePassword(password: string) {
    this.password = password;
    return this.save();
  }

  public generateToken() {
    return jwt.sign(
      {
        sub: this.id,
        iss: process.env.JWT_ISSUER
      } as object,
      this.password + process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async _beforeSave() {
    const user = await User.findOne(this.id);
    if (!user || user.password !== this.password) {
      this.password = await bcrypt.hash(this.password, 15);
    }
  }
}
