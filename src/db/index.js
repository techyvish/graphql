import bluebird from 'bluebird';
import {
  configEnum,
} from '../config';

const connectMongo = async (config, mongoose) => {
  const url = `${config[configEnum.DB_URL]}/${config[configEnum.DB_NAME]}`;
  mongoose.Promise = bluebird;
  let success = false;
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
    });
    success = true;
  } catch (err) {
    success = false;
  }
  // eslint-disable-next-line
  mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
  return success;
};

export default connectMongo;
