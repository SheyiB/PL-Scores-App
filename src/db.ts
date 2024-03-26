import mongoose, { Connection } from 'mongoose';
import { env } from './common/config/env';

export class DB {

    async connect() {
        try {
            if (!env.MONGODB_URI) throw new Error('MONGODB_URI is not defined');
            await mongoose.connect(env.MONGODB_URI);
        } catch (error) {
            throw error;
        }
    }

    async disconnect() {
        await mongoose.disconnect();
    }
}

export default new DB();
