import BaseRepository from '../base';
import { ObjectId } from 'mongodb';

class StatsRepository extends BaseRepository {

  constructor(db) {
    super();
    this.Stats = db
  }

  async create(stats) {
    return await this.Stats.insert(stats);
  }

  async update(stats) {
    return await this.Stats.update(stats);
  }

  async delete(stats) {
    return await this.Stats.delete(stats);
  }

  async findOne(id) {
    return await this.Stats.findOne({ _id: new ObjectId(id) });
  }

  //TODO: add limit/filter etc optional parameters
  async findAll() {
    return await this.Stats.find();
  }

  async findQuery(query) {
    return await this.Stats.find(query);
  }
}

const createNewStatsRepository = (db) => {
  return new StatsRepository(db);
};

export default createNewStatsRepository;