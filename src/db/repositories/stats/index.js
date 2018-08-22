import {
  ObjectId,
} from 'mongodb';
import autoBind from 'auto-bind';
import BaseRepository from '../base';
import {
  Stat,
} from '../../schema';

class StatRepository extends BaseRepository {

  constructor() {
    super();
    this.Stat = Stat;
    autoBind(this);
  }

  create(stat) {
    return this.Stat.save(stat);
  }

  update(stat) {
    return this.Stat.update(stat);
  }

  delete(stat) {
    return this.Stat.delete(stat);
  }

  findOne(id) {
    return this.Stat.findOne({
      _id: new ObjectId(id),
    }).exec();
  }

  // TODO: add limit/filter etc optional parameters
  findAll() {
    return this.Stat.find().exec();
  }

  findQuery(query) {
    return this.Stat.find(query).exec();
  }
}

export default StatRepository;
