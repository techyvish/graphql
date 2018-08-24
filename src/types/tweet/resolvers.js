import {
  withFilter,
} from 'graphql-subscriptions';

import TOPICS from '../../subscriptions/topics';

export const Query = {
  Tweets: async (_, __, {
    tweetRepository,
  }) => {
    const tweets = await tweetRepository.findAll();
    return tweets;
  },
  Tweet: async (_, {
    id,
  }, {
    tweetRepository,
  }) => {
    const tweet = await tweetRepository.findOne(id);
    return tweet;
  },
};

export const Tweet = {
  author: async (tweet, _, {
    userRepository,
  }) => {
    const user = await userRepository.findOne(tweet.author_id);
    return user;
  },
  stats: async (tweet, _, context) => {
    // eslint-disable-next-line no-underscore-dangle
    const stats = await context.dataloaders.statForTweet.load(tweet._id);
    return stats;
  },
};

export const Mutation = {
  createTweet: async (root, args, {
    tweetRepository,
    pubsub,
  }) => {
    const newTweet = {
      body: args.body,
      author_id: args.authorId,
      date: new Date(),
    };

    const response = await tweetRepository.create(newTweet);
    const obj = response;
    pubsub.publish(TOPICS.TWEET.TWEET_ADDED, {
      somethingChanged: {
        id: 'PPP',
      },
    });
    return obj;
  },
};

export const Subscription = {
  somethingChanged: {
    resolve: payload => payload.somethingChanged,
    subscribe: withFilter(
      (data, args, {
        pubsub,
      }) => pubsub.asyncIterator(TOPICS.TWEET.TWEET_ADDED),
      () => true,
    ),
  },
};
