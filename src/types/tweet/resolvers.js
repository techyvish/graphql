import { ObjectId } from 'mongodb';
import { prepare } from '../../utils';
import TOPICS from '../../subscriptions/topics';
import { withFilter } from 'graphql-subscriptions';

export const Query = {
  Tweets: async (_, { limit = 5, skip = 0 }, { mongo: { Tweets } }) => {
    const tweets = await Tweets.find().toArray();
    return tweets.map(prepare);
  },
  Tweet: async (_, { id }, { tweetRepository }) => {
    let tweet = prepare(await tweetRepository.findOne(id));
    return tweet;
  },
};

export const Tweet = {
  author: async (tweet, _, { userRepository }) => {
    let user = await userRepository.findOne(tweet.author_id);
    return prepare(user);
  },
  stats: async (tweet, _, context) => {
    let stats = await context.dataloaders.statForTweet.load(tweet._id);
    return prepare(stats);
  }
};

export const Mutation = {
  createTweet: async (root, args, { tweetRepository, pubsub }) => {
    const newTweet = {
      body: args.body,
      author_id: args.authorId,
      date: new Date(),
    }

    const response = await tweetRepository.create(newTweet);
    const obj = prepare(Object.assign({ _id: response.insertedIds[0] }, newTweet));
    pubsub.publish(TOPICS.TWEET.TWEET_ADDED, { somethingChanged: { id: "PPP" } });
    return obj;
  }
}

export const Subscription = {
  somethingChanged: {
    resolve: (payload) => {
      return payload.somethingChanged;
    },
    subscribe: withFilter(
      (data, args, { pubsub }) => {
        return pubsub.asyncIterator(TOPICS.TWEET.TWEET_ADDED);
      },
      (payload, variables) => {
        console.log(`Check if filter satisfied ${payload} ${variables}`);
        return true
      }
    )
  },
}
