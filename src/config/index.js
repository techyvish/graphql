import * as dotenv from 'dotenv';
import _ from 'lodash';

const configEnum = {
  APP_PORT: 'app_port',
  DB_URL: 'db_url',
  DB_NAME: 'db_name',
};

Object.freeze(configEnum);

const result = dotenv.config();
if (result.error) {
  throw result.error;
}

const config = {
  app_port: 0,
  db_url: '',
  db_name: '',
};

if (process.env.NODE_ENV === 'development') {
  _.update(config, configEnum.APP_PORT, () => parseInt(process.env.DEV_PORT, 0) || 4000);
  _.update(config, configEnum.DB_URL, () => process.env.DEV_DB_URL || 'localhost');
  _.update(config, configEnum.DB_NAME, () => process.env.DEV_DB_NAME || 'twitter');
} else if (process.env.NODE_ENV === 'test') {
  _.update(config, configEnum.APP_PORT, () => parseInt(process.env.PROD_PORT, 0) || 4000);
  _.update(config, configEnum.DB_URL, () => process.env.PROD_DB_URL || 'localhost');
  _.update(config, configEnum.DB_NAME, () => process.env.TEST_DB_NAME || 'test');
} else {
  _.update(config, configEnum.APP_PORT, () => parseInt(process.env.PROD_PORT, 0) || 4000);
  _.update(config, configEnum.DB_URL, () => process.env.PROD_DB_URL || 'localhost');
  _.update(config, configEnum.DB_NAME, () => process.env.TEST_DB_NAME || 'twitter');
}

export {
  config,
  configEnum,
};
