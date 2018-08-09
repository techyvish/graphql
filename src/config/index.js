import dotenv from 'dotenv';

const env = process.env.NODE_ENV; //
const result = dotenv.config();
if (result.error) {
  throw result.error
}

const development = {
  app: {
    port: parseInt(process.env.DEV_PORT) || 4000
  },
  db: {
    url: process.env.DEV_DB_URL || 'localhost',
    name: process.env.DEV_DB_NAME || 'twitter'
  }
};

 const production = {
  app: {
    port: parseInt(process.env.PROD_PORT) || 4000
  },
  db: {
    url: process.env.PROD_DB_URL || 'localhost',
    name: process.env.TEST_DB_NAME || 'twitter'
  }
 };


// Add your environments here.
export default {
    development,
    production,
}[process.env.NODE_ENV];