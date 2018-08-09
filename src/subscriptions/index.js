import { RedisPubSub } from 'graphql-redis-subscriptions';
import * as Redis from 'ioredis';


const redisConnectionListener = (err) => {
  if (err) console.error(err); // eslint-disable-line no-console
  console.info('Succefuly connected to redis'); // eslint-disable-line no-console
};

const redisOptions = {
  host: 'localhost',
  port: 6379,
  connect_timeout: 15000,
  enable_offline_queue: true,
  retry_unfulfilled_commands: true,
};

const pubsub = new RedisPubSub({
  connection: redisOptions,
  connectionListener: redisConnectionListener,
});

export default pubsub;
