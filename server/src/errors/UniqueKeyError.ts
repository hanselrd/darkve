import { createError } from 'apollo-errors';

export default createError('UniqueKeyError', {
  message: 'Unique key'
});
