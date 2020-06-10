import assert from 'assert';
import {logger} from './lib/logger';
import {serverConfig, env} from '../config';

import {app} from './app';
import {connectDatabase, disconnectDatabase} from './providers/mongodb';
import {startCron, stopCron} from './cron';

let customPort = undefined;

const {NODEJS_PORT} = env;

if (NODEJS_PORT !== undefined) {
    customPort = parseInt(NODEJS_PORT, 10);
    assert(
        !isNaN(customPort),
        'Environment variable NODEJS_PORT must be an integer'
    );
}

const port = customPort || serverConfig.port;

(async () => {
    const exitHandler = async () => {
        await disconnectDatabase();
        stopCron();

        if (server) {
            server.close(() => {
                logger.info('Server closed');
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    };

    function handleOnListen(err: Error | null): void {
        if (err) {
            logger.error('Application start error ', err);
            exitHandler();
        }
        logger.info(`Application started on port ${port}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const unexpectedErrorHandler = (error: any) => {
        logger.error(error);
        exitHandler();
    };

    process.on('uncaughtException', unexpectedErrorHandler);
    process.on('unhandledRejection', unexpectedErrorHandler);

    await Promise.all([connectDatabase(), startCron()]);

    const server = app.listen(port, handleOnListen);
})();
