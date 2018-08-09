import {
  Query as UserQuery,
  User,
  Mutation as CreateUserMutation
} from './types/user/resolvers';

import {
  Query as TweetQuery,
  Tweet,
  Mutation as CreateTweetMutation,
  Subscription as TweetAddedSubscription,
  Subscription as SomethingChangedSubscription,
} from './types/tweet/resolvers';

import Date from './types/scalar/Date';
import Email from './types/scalar/Email';

export default {
  Query: {
    ...UserQuery,
    ...TweetQuery,
  },
  Mutation: {
    ...CreateUserMutation,
    ...CreateTweetMutation,
  },
  Subscription: {
    ...TweetAddedSubscription,
    ...SomethingChangedSubscription,
  },
  User,
  Tweet,
  Email,
  Date,
};
