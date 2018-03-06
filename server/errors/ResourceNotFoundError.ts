import { createError } from 'apollo-errors';

export default createError('ResourceNotFoundError', {
  message: 'Resource not found'
});
