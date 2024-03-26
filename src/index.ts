import { app, logger } from '@/server';
import { env } from '@/common/config/env';
import db from '@/db';


export const start = async () => {
    await db.connect();

    logger.info('Connected to database');

    app.listen(env.PORT, () => {
        logger.info(`Server listening on port ${env.PORT}`);
    })
}

start();


