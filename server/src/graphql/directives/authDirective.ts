import { AuthError } from '../../errors';

export default (next, src, args, { user }) => {
  if (user) {
    return next();
  }
  throw new AuthError();
};
