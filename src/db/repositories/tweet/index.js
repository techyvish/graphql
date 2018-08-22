import {
  ObjectId,
} from 'mongodb';
import autoBind from 'auto-bind';
import BaseRepository from '../base';
import {
  Tweet,
} from '../../schema';

class TweetRepository extends BaseRepository {

  constructor() {
    super();
    this.Tweet = Tweet;
    autoBind(this);
  }

  create(tweet) {
    return this.Tweet.create(tweet);
  }

  update(tweet) {
    return this.Tweet.update(tweet);
  }

  delete(tweet) {
    return this.Tweet.delete(tweet);
  }

  findOne(id) {
    return this.Tweet.findOne({
      _id: new ObjectId(id),
    }).exec();
  }

  // TODO: add limit/filter etc optional parameters
  findAll() {
    return this.Tweet.find().exec();
  }

  findQuery(query) {
    return this.Tweet.find(query).exec();
  }
}

export default TweetRepository;
