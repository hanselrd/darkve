import { AuthRequiredError, ResourceNotFoundError } from '../../errors';
import { User } from '../../entity';

export default {
  Query: {
    users: () => User.find(),
    user: (parent: any, { id }: any) => User.findOneById(id),
    currentUser: (parent: any, args: any, { user }: any) => {
      if (!user) {
        throw new AuthRequiredError();
      }
      return {
        id: 1,
        name: 'Hansel',
        email: 'hansel@gmail.com'
      };
    }
  },
  Mutation: {
    signup: async (parent: any, args: any) => {
      const user = await User.create(args).save();
      return { token: '123', user };
    },
    login: async (parent: any, { email, password }: any) => {
      const user = await User.findOne({ where: { email, password } });
      if (user) {
        return { token: '321', user };
      }
    }
  }
};
