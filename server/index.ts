import { GraphQLServer, Options, PubSub } from 'graphql-yoga';
import { formatError } from 'apollo-errors';
import schema from './schema';

const options: Options = {
  endpoint: '/graphql',
  subscriptions: '/graphql',
  playground: process.env.NODE_ENV !== 'production' ? '/playground' : false,
  formatError
};

const pubsub = new PubSub();
const server = new GraphQLServer({
  schema,
  context: req => {
    let user = null;
    let token = '';
    if (req.request) {
      token = <string>req.request.get('Authorization');
    } else if (req.connection) {
      token = <string>req.connection.context['Authorization'];
    }
    if (token) {
      user = { token: token.replace('Bearer ', '') };
    }
    return { ...req, user, pubsub };
  }
});

server.start(options, ({ port }) =>
  console.log(`Server is running on port ${port}`)
);
