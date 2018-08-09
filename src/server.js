import { ApolloServer } from 'apollo-server-express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import express from 'express';

import schema from './schema';
import buildDataLoaders from './dataloaders';
import builder from './db/repositories';
import pubsub from './subscriptions';
import db from './db';
import config from './config';
// create jwtMiddleware
// app use middleware
// decode jwt from out secret
// get user
// if user then pass into context
// else throw error [Authenticateion]

// in each resolver check if user has access to do this action
// check user._id ?? [Authorization]

const start = async () => {

  const mongo = await db.connectMongo();
  const repositories = db.createRepositories(builder, mongo);

  const context = {
    mongo,
    dataloaders: buildDataLoaders(repositories),
    ...repositories,
    pubsub,
  };

  const port = config.app.port;
  const app = express();
  app.use(cors({ origin: true, credentials: true }));
  app.use(cookieParser());

  const server = new ApolloServer({
    // These will be defined for both new or existing servers
    context,
    schema,
    subscriptionsPath: `ws://localhost:${port}/subscriptions`,
    subscriptions: {
      onConnect: (connectionParams, webSocket) => {
        return {};
      },
    },
  });

  server.applyMiddleware({ app, path: '/graphql', context });

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  httpServer.listen({ port }, () => {
    console.log(`🚀 Apollo Server on http://localhost:${port}/graphql`);
  });

};

start();



