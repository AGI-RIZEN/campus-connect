import Redis from 'ioredis';
import { env } from './env';

const globalForRedis = globalThis as unknown as { redis?: Redis };

export const redis =
  globalForRedis.redis ??
  new Redis(env.REDIS_URL, {
    maxRetriesPerRequest: 3,
    // Dual-stack DNS lookup: Railway's private network (redis.railway.internal) is IPv6,
    // and ioredis defaults to IPv4-only. family: 0 works for both (also fine locally).
    // .duplicate() for the Socket.io pub/sub clients inherits this.
    family: 0,
  });

redis.on('error', (err) => {
  console.error('[redis] connection error:', err.message);
});

redis.on('connect', () => {
  console.log('[redis] connected');
});

if (env.NODE_ENV !== 'production') {
  globalForRedis.redis = redis;
}
