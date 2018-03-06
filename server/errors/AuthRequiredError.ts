import { createError } from 'apollo-errors';

export default createError('AuthRequiredError', {
  message: 'Auth required'
});
