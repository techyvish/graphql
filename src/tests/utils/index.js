import _ from 'lodash';
import mongoose from 'mongoose';
import {
  configEnum,
} from '../../config';
import connectMongo from '../../db';

const connectToTestDB = () => {
  const config = {
    port: 4000,
  };
  _.update(config, configEnum.DB_URL, () => 'mongodb://localhost:27017');
  _.update(config, configEnum.DB_NAME, () => 'test');
  return connectMongo(config, mongoose);
}

export default connectToTestDB;
