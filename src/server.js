import {
  ApolloServer,
} from 'apollo-server-express';
import mongoose from 'mongoose';
import http from 'http';
import cors from 'cors';
import express from 'express';
import schema from './schema';
import buildDataLoaders from './dataloaders';
import pubsub from './subscriptions';
import connectMongo from './db';
import {
  config,
  configEnum,
} from './config';

import {
  UserRepository,
  TweetRepository,
  StatsRepository,
} from './db/repositories';

// create jwtMiddleware
// app use middleware
// decode jwt from out secret
// get user
// if user then pass into context
// else throw error [Authentication]

// in each resolver check if user has access to do this action
// check user._id ?? [Authorization]

const start = async () => {
  await connectMongo(config, mongoose);

  const repositories = {
    userRepository: new UserRepository(),
    tweetRepository: new TweetRepository(),
    statsRepository: new StatsRepository(),
  };

  const context = {
    dataloaders: buildDataLoaders(repositories),
    ...repositories,
    pubsub,
  };

  const port = config[configEnum.APP_PORT];
  const app = express();
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );

  const server = new ApolloServer({
    // These will be defined for both new or existing servers
    context,
    schema,
    subscriptionsPath: `ws://localhost:${port}/subscriptions`,
    subscriptions: {
      onConnect: () => {},
    },
  });

  server.applyMiddleware({
    app,
    path: '/graphql',
    context,
  });

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  httpServer.listen({
      port,
    },
    // eslint-disable-next-line
    () => console.log(`🚀 Apollo Server on http://localhost:${port}/graphql`));
};

start();
