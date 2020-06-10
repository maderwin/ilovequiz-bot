import {Boom, internal} from '@hapi/boom';
import {Request, Response, NextFunction} from 'express';

import {ErrorResponse} from '../../common/types/api/error';

import {logger} from '../lib/logger';

const errorMiddleware = (
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
    if (isBoom(error)) {
        sendError(res, error);
    } else {
        if (error.stack) {
            logger.error(error.stack);
        } else {
            logger.error(error);
        }
        sendError(res, internal());
    }
};

function isBoom(error: Error): error is Boom {
    return 'isBoom' in (error as Boom);
}

function sendError(res: Response, error: Boom): void {
    const responseBody: ErrorResponse = {error: error.output.payload};

    res.status(error.output.statusCode).json(responseBody);
}

export {errorMiddleware};
