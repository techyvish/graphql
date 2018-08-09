import User from '../user/schema';
import Stat from '../stats/schema';
import Base from '../base';

const Tweet = `
extend type Query {
    Tweet(id: ID!): Tweet
    Tweets(limit: Int, skip: Int, sort_field: String, sort_order: String): [Tweet]
    TweetsMeta: Meta
}

extend type Mutation {
    createTweet (body: String!, authorId: ID!): Tweet
    deleteTweet(id: ID!): Tweet
    markTweetRead(id: ID!): Boolean
}

extend type Subscription {
    tweetAdded(authorId: ID!): Tweet
    somethingChanged: Result
}

type Tweet {
    _id: ID!
    # The tweet text. No more than 140 characters!
    body: String
    # When the tweet was published
    date: Date
    # Who published the tweet
    author: User
    # Views, retweets, likes, etc
    stats: Stat
}

type Result{
    id: String
}

`;

export default () => [Tweet, User, Stat, Base];
