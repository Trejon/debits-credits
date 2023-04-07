import RedisStore from "connect-redis";

const redis = require('redis');
const { promisify } = require('util');

export const redisClient = redis.createClient({
  url: 'redis://cache:6379',
  legacyMode: true,
});

(async () => {
  await redisClient.connect();
})();

// Set up Redis connection pooling
redisClient.on('error', (err: any) => {
  console.error('Redis error:', err);
});

redisClient.on('connect', () => {
  console.log('Redis client connected');
});

redisClient.on('end', () => {
  console.warn('Redis connection closed');
});

process.on('SIGINT', () => {
  redisClient.quit(() => {
    console.log('Redis client disconnected through app termination');
    process.exit(0);
  });
});


export const sessionStore = new RedisStore({ client: redisClient });

export const redisGetAsync = promisify(redisClient.get).bind(redisClient);
export const redisSetAsync = promisify(redisClient.set).bind(redisClient);