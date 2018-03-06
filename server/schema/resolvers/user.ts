import { AuthRequiredError, ResourceNotFoundError } from '../../errors';

export default {
  Query: {
    users: () => {},
    user: (_: any, { id }: any) => {
      if (id !== '1') {
        throw new ResourceNotFoundError({
          message: `No user exists with id: ${id}`
        });
      }
      return { id };
    },
    currentUser: (_1: any, _2: any, { user }: any) => {
      if (!user) {
        throw new AuthRequiredError();
      }
      return {
        id: 1,
        name: 'Hansel',
        email: 'hansel@gmail.com'
      };
    }
  }
};
