import {
  withFilter,
} from 'graphql-subscriptions';
import {
  prepare,
} from '../../utils';
import TOPICS from '../../subscriptions/topics';

export const Query = {
  Tweets: async (_, __, {
    mongo: {
      Tweets,
    },
  }) => {
    const tweets = await Tweets.find().toArray();
    return tweets.map(prepare);
  },
  Tweet: async (_, {
    id,
  }, {
    tweetRepository,
  }) => {
    const tweet = prepare(await tweetRepository.findOne(id));
    return tweet;
  },
};

export const Tweet = {
  author: async (tweet, _, {
    userRepository,
  }) => {
    const user = await userRepository.findOne(tweet.author_id);
    return prepare(user);
  },
  stats: async (tweet, _, context) => {
    // eslint-disable-next-line no-underscore-dangle
    const stats = await context.dataloaders.statForTweet.load(tweet._id);
    return prepare(stats);
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
    const obj = prepare(response);
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
