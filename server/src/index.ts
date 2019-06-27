import * as common from 'darkve-common';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import User from './models/user';

console.log(common.sum([1, 2, 3, 4]));

const main = async () => {
  const connection = await createConnection({
    type: 'sqlite',
    database: 'darkve.sqlite',
    entities: [User],
    logging: true,
    synchronize: true
  });

  const userRepository = connection.getRepository(User);

  const user = new User();
  user.name = 'Peter';
  user.email = 'peter@gmail.com';
  user.password = '123456';
  user.dob = new Date('2000-01-01');
  user.save();

  const allUsers = await userRepository.find();

  allUsers.forEach(value => {
    console.log(`User ${value.id}: ${value}`);
  });
};

main().catch(console.error);
