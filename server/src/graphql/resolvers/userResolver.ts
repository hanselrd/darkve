import { LoginError, SignupError, UniqueKeyError } from '../../errors';
import { User } from '../../models';

export default {
  Query: {
    users: () => User.find({ where: { gm: 0 } }),
    user: (parent, { id }) => User.findOneById(id, { where: { gm: 0 } }),
    currentUser: (parent, args, { user }) => user
  },
  Mutation: {
    signup: async (parent, args) => {
      const user = await User.create(args);
      const errors = await user.validate();
      if (errors) {
        throw new SignupError({ data: errors });
      }
      try {
        await user.save();
      } catch (err) {
        if (err instanceof UniqueKeyError) {
          throw new SignupError(err);
        }
        throw err;
      }
      return { token: user.generateToken(), user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new LoginError({
          data: { email: 'No user exists with that email' }
        });
      }
      if (!await user.authenticate(password)) {
        throw new LoginError({
          data: { password: 'Password is incorrect' }
        });
      }
      return { token: user.generateToken(), user };
    }
  }
};
