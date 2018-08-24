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
    return new Promise((resolve, reject) => {
      this.Tweet.findOne({
        _id: new ObjectId(id),
      }).exec().then(doc => {
        resolve(doc && doc.toObject());
      }).catch(err => {
        reject(err);
      });
    });
  }

  // TODO: add limit/filter etc optional parameters
  findAll() {
    return new Promise((resolve, reject) => {
      this.Tweet.find().exec().then(doc => {
        resolve(doc && doc.map(o => o.toObject()));
      }).catch(err => {
        reject(err);
      });
    });
  }

  findQuery(query) {
    return new Promise((resolve, reject) => {
      this.Tweet.find(query).exec().then(doc => {
        resolve(doc && doc.map(o => o.toObject()));
      }).catch(err => {
        reject(err);
      })
    });
  }
}

export default TweetRepository;
