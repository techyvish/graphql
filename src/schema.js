import {
  makeExecutableSchema,
} from 'graphql-tools';
import Base from './types/base';
import User from './types/user/schema';
import Tweet from './types/tweet/schema';
import Stat from './types/stats/schema';
import resolvers from './resolvers';

export default makeExecutableSchema({
  typeDefs: [Base, User, Tweet, Stat],
  resolvers,
  logger: {
    // eslint-disable-next-line
    log: e => console.log(e),
  },
});
