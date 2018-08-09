import BaseRepository from '../base';
import { ObjectId } from 'mongodb';

class TweetRepository extends BaseRepository {

  constructor(db) {
    super();
    this.Tweets = db
  }

  async create(tweet) {
    return await this.Tweets.insert(tweet);
  }

  async update(tweet) {
    return await this.Tweets.update(tweet);
  }

  async delete(tweet) {
    return await this.Tweets.delete(tweet);
  }

  async findOne(id) {
    return await this.Tweets.findOne({ _id: new ObjectId(id) });
  }

  //TODO: add limit/filter etc optional parameters
  async findAll() {
    return await this.Tweets.find();
  }

  async findQuery(query) {
    return await this.Tweets.find(query);
  }
}

const createNewTweetRepository = (db) => {
  return new TweetRepository(db);
};

export default createNewTweetRepository;