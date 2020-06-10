import express, {Request, Response} from 'express';
import next from 'next';
import {join} from 'path';

import {logger} from '../lib/logger';
import {wrapAsyncMiddleware} from '../lib/wrap-async-middleware';
import {isDev} from '../../config';

const frontend = next({dev: isDev, dir: join(__dirname, '../../client/')});

const frontendHandler = frontend.getRequestHandler();

(async () => {
    try {
        await frontend.prepare();
    } catch (error) {
        logger.error(error);

        throw error;
    }
})();

const frontendMiddleware = express.Router();

frontendMiddleware.all(
    '*',
    wrapAsyncMiddleware((req: Request, res: Response) =>
        frontendHandler(req, res)
    )
);

export {frontendMiddleware};
