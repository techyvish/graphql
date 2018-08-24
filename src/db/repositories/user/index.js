import {
  ObjectId,
} from 'mongodb';
import autoBind from 'auto-bind';
import BaseRepository from '../base';
import {
  User,
} from '../../schema';

class UserRepository extends BaseRepository {

  constructor() {
    super();
    this.User = User;
    autoBind(this);
  }

  create(user) {
    return this.User.create(user);
  }

  update(user) {
    this.User.update(user);
  }

  delete(user) {
    this.User.delete(user);
  }

  findOne(id) {
    return new Promise((resolve, reject) => {
      this.User.findOne({
        _id: new ObjectId(id)
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
      this.User.find().exec().then(doc => {
        resolve(doc && doc.map(o => o.toObject()));
      }).catch(err => {
        reject(err);
      });
    });
  }

  findQuery(query) {
    return new Promise((resolve, reject) => {
      this.User.find(query).exec().then(doc => {
        resolve(doc && doc.map(o => o.toObject()));
      }).catch(err => {
        reject(err);
      });
    });
  }
}

export default UserRepository;
