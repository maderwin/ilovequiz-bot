import mongoose from 'mongoose';

import {serverConfig} from '../../../config';

import {logger} from '../../lib/logger';
import {DatabaseError} from '../../lib/errors/database';

const {mongodb} = serverConfig;

const connectDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(mongodb.url, mongodb.options);
        logger.info('Connected to database');
    } catch (error) {
        throw new DatabaseError(error, 'Error connecting to database');
    }
};

const disconnectDatabase = async (): Promise<void> => {
    await mongoose.disconnect();
};

export {connectDatabase, disconnectDatabase};
