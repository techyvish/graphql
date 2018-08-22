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
    return this.User.findOne({
      _id: new ObjectId(id),
    }).exec();
  }

  // TODO: add limit/filter etc optional parameters
  findAll() {
    return this.User.find().exec();
  }

  findQuery(query) {
    return this.User.find(query).exec();
  }
}

export default UserRepository;
