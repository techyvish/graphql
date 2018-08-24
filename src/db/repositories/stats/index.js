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
    return new Promise((resolve, reject) => {
      this.Stat.findOne({
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
      this.Stat.find().exec().then(doc => {
        resolve(doc && doc.map(o => o.toObject()));
      }).catch(err => {
        reject(err);
      });
    });
  }

  findQuery(query) {
    return new Promise((resolve, reject) => {
      this.Stat.find(query).exec().then(doc => {
        resolve(doc && doc.map(o => o.toObject()));
      }).catch(err => {
        reject(err);
      });
    });
  }
}

export default StatRepository;
