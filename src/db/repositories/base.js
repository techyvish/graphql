class BaseRepository {
  constructor() {
    if (this.create === undefined) {
      throw new Error('Must override .create() method');
    }

    if (this.update === undefined) {
      throw new Error('Must override .update() method');
    }

    if (this.delete === undefined) {
      throw new Error('Must override .delete() method');
    }

    if (this.findOne === undefined) {
      throw new Error('Must override .findOne() method');
    }

    if (this.findAll === undefined) {
      throw new Error('Must override .findAll() method');
    }

    if (this.findQuery === undefined) {
      throw new Error('Must override .findQuery() method');
    }
  }
}

export default BaseRepository;
