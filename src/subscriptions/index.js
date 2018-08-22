import {
  RedisPubSub,
} from 'graphql-redis-subscriptions';

const redisConnectionListener = (err) => {
  // eslint-disable-next-line no-console
  if (err) console.error(err);
  // eslint-disable-next-line no-console
  console.info('Successfully connected to redis');
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
