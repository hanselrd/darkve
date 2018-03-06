import 'reflect-metadata';
import { GraphQLServer, Options, PubSub } from 'graphql-yoga';
import { formatError } from 'apollo-errors';
import { createConnection } from 'typeorm';
import schema from './schema';
import { User } from './entity';

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

createConnection({
  type: 'postgres',
  url: 'postgresql://postgres:postgres@localhost/darkve_dev',
  synchronize: true,
  logging: true,
  entities: [User]
}).then(() => {
  server.start(options, ({ port }) =>
    console.log(`Server is running on port ${port}`)
  );
});
