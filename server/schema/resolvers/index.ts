import { fileLoader, mergeResolvers } from 'merge-graphql-schemas';
import GraphQLDate from 'graphql-date';
import GraphQLJSON from 'graphql-type-json';
import path from 'path';

export default mergeResolvers(
  (<any[]>fileLoader(path.join(__dirname, '.'))).concat({
    Date: GraphQLDate,
    JSON: GraphQLJSON
  })
);
