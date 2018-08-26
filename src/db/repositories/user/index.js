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
    return new Promise((resolve, reject) => {
      this.User.create(user).then(obj => {
        resolve(obj);
      }).catch(error => {
        reject(error);
      });
    });
  }

  update(id, data) {
    return new Promise((resolve, reject) => {
      this.User.findOneAndUpdate({
          _id: new ObjectId(id)
        },
        data, {
          upsert: true,
          new: true
        }).exec().then(doc => {
        resolve(doc && doc.toObject());
      }).catch(err => {
        reject(err);
      });
    });
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

  delete(user) {
    this.User.delete(user);
  }

}

export default UserRepository;
