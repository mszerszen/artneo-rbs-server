import Redis from 'ioredis';

export const redisClient = new Redis({
  host: 'localhost',
  port: 6379
});

redisClient.on('error', (err) => console.error('Redis Error:', err));
redisClient.on('connect', () => console.log('Połączono z Redis'));