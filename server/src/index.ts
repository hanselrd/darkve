import 'reflect-metadata';
import { GraphQLServer, Options } from 'graphql-yoga';
import { formatError } from 'apollo-errors';
import { createConnection } from 'typeorm';
import express from 'express';
import jwt from 'jsonwebtoken';
import socketIo from 'socket.io';
import http from 'http';
import path from 'path';

import schema from './graphql';
import { User } from './models';

const options: Options = {
  port: +process.env.PORT || 4000,
  endpoint: '/graphql',
  subscriptions: false,
  playground: process.env.NODE_ENV !== 'production' ? '/playground' : false,
  formatError
};

const server = new GraphQLServer({
  schema,
  context: async req => {
    let token = <string>req.request.get('authorization');
    if (token) {
      try {
        token = token.replace('Bearer ', '');
        const decoded = jwt.decode(token);
        if (decoded) {
          const { sub } = <any>decoded;
          const user = await User.findOneById(sub);
          jwt.verify(token, user.password + process.env.JWT_SECRET);
          return { ...req, user };
        }
      } catch (err) {}
    }
    return { ...req };
  }
});

server.express.use(express.static(path.join(__dirname, '../../client/build')));

server.express.get('*', (req, res, next) => {
  if (!server.options.playground || req.url !== server.options.playground) {
    return res.sendFile(path.join(__dirname, '../../client/build/index.html'));
  }
  return next();
});

createConnection({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: process.env.NODE_ENV !== 'production',
  entities: [User]
}).then(async () => {
  const httpServer = await server.start(options, ({ port }) => {
    console.log(`Server is running on port ${port}`);
  });

  const io = socketIo(httpServer);
  io.on('connection', socket => {
    console.log('Connected:', socket.id);
    if (true) {
      socket.join('gm');
    }
    socket.broadcast
      .to('gm')
      .emit('player-connect', { msg: `${socket.id} connected` });

    socket.on('disconnect', () => {
      socket.broadcast
        .to('gm')
        .emit('player-disconnect', { msg: `${socket.id} disconnected` });
      console.log('Disconnected:', socket.id);
    });
  });
});
