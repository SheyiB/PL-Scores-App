import dotenv from 'dotenv';

dotenv.config();

export const env = {
    PORT: Number(process.env.PORT),
    MONGODB_URI: process.env.MONGODB_URI,
    APP_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE: process.env.JWT_EXPIRE,
    API_URL: process.env.API_LINK,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: Number(process.env.REDIS_PORT),
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    SESSION_SECRET: process.env.SESSION_SECRET,
    MAX_REQUEST: Number(process.env.MAX_REQUEST),
    RATE_LIMIT_WINDOW: Number(process.env.RATE_LIMIT_WINDOW),
    EXPRESS_SESSION_SECRET: process.env.SESSION_SECRET,
}