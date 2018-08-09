import { MongoClient } from 'mongodb';
import config from '../config';

const url = `${config.db.url}/${config.db.name}`;

const connectMongo = async () => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true });
  const db = await client.db();
  return {
    Users: db.collection('users'),
    Stats: db.collection('stats'),
    Tweets: db.collection('tweets')
  };
}

class Repositories {
  constructor(repositoryBuilder, database) {
    this.tweetRepository = repositoryBuilder.createNewTweetRepository(database.Tweets);
    this.userRepository = repositoryBuilder.createNewUserRepository(database.Users);
    this.statsRepository = repositoryBuilder.createNewStatsRepository(database.Stats);
  }
}

const createRepositories = (repositoryBuilder, database) => new Repositories(repositoryBuilder, database);

export default {
  connectMongo,
  createRepositories,
}
