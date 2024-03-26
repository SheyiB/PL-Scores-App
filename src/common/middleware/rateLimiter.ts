import { Request } from 'express';
import { rateLimit } from 'express-rate-limit'

import { env } from '@/common/config/env';
import { logger } from '@/server'

const rateLimiter = rateLimit({
    legacyHeaders: true,
    limit: env.MAX_REQUEST,
    message: 'Too many Request, Try again Later',
    standardHeaders: true,
    windowMs: env.RATE_LIMIT_WINDOW,
    keyGenerator
});

function keyGenerator(request: Request): string {
    if (!request.ip) {
        logger.warn('Request IP missing');
        return request.socket.remoteAddress as string;
    }

    return request.ip.replace(/:\d+[^:]*$/, '');
}

export default rateLimiter;