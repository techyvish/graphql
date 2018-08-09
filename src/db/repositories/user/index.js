import BaseRepository from '../base';
import { ObjectId } from 'mongodb';

class UserRepository extends BaseRepository {

  constructor(db) {
    super();
    this.Users = db
  }

  async create(user) {
    return await this.Users.insert(user);
  }

  async update(user) {
    return await this.Users.update(user);
  }

  async delete(user) {
    return await this.Users.delete(user);
  }

  async findOne(id) {
    return await this.Users.findOne({ _id: new ObjectId(id) });
  }

  //TODO: add limit/filter etc optional parameters
  async findAll() {
    return await this.Users.find();
  }

  async findQuery(query) {
    return await this.Users.find(query);
  }
}

const createNewUserRepository = (db) => {
  return new UserRepository(db);
};

export default createNewUserRepository;