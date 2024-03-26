import express, { Express } from 'express';

import { pino } from 'pino';

import auth from './api/auth';
import team from './api/teams';
import fixture from './api/fixtures';
import search from './api/search';

import rateLimiter from '@/common/middleware/rateLimiter';

import session from 'express-session';
import { createClient } from 'redis';
import redisClient from './common/redis/redis-client/redis.config';
import { RedisStore as RedisStoreType } from 'connect-redis';
import RedisStore from 'connect-redis';

import { seedDatabase } from './common/utils/seeder';


//seedDatabase().catch(console.error);

import { env } from './common/config/env';

const logger = pino({ name: 'pl server' })



redisClient.connect().catch(console.error)
redisClient.on('connect', () => {
    logger.info('Redis Client Connected 🗳️')
})

// let redisStore: any = new RedisStore({
//     client: redisClient

// }) as unknown as RedisStoreType;


const app: Express = express();

app.use(express.json());

app.use(rateLimiter)
// app.use(
//     session({
//         store: redisStore,
//         resave: false,
//         saveUninitialized: false,
//         secret: "keyboard cat",
//     }),
// )


app.use('/auth', auth);
app.use('/teams', team);
app.use('/fixtures', fixture);
app.use('/pl', search);


export { app, logger }