import { validate } from 'class-validator';
import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  QueryFailedError,
  UpdateDateColumn
} from 'typeorm';

export default abstract class Model extends BaseEntity {
  @PrimaryGeneratedColumn() public id!: number;

  @CreateDateColumn() public createdAt!: Date;

  @UpdateDateColumn() public updatedAt!: Date;

  public async validate() {
    const errors = await validate(this, { validationError: { target: false } });

    if (errors.length > 0) {
      const formattedErrors: any = {};
      errors.forEach(error => {
        formattedErrors[error.property] = Object.keys(error.constraints).map(
          key => error.constraints[key][0].toUpperCase() + error.constraints[key].substr(1)
        );
      });
      return formattedErrors;
    }
    return null;
  }

  public async save() {
    try {
      return await super.save();
    } catch (err) {
      if (err instanceof QueryFailedError) {
        const property = ((err as any).constraint as string).replace(
          `uk_${(err as any).table}_`,
          ''
        );
        throw new Error(`${property[0].toUpperCase() + property.substr(1)} is already taken`);
      }
      throw err;
    }
  }
}
