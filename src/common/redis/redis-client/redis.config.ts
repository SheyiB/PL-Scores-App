import Redis from 'ioredis';
import { env } from '@/common/config/env';
import { createClient, RedisClientType } from 'redis';


let redisClient = createClient({
    password: env.REDIS_PASSWORD,
    socket: {
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
        connectTimeout: 0,
    },

})
export default redisClient;