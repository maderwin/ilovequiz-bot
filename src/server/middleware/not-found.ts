import {notFound} from '@hapi/boom';
import {Request, Response, NextFunction} from 'express';

const notFoundMiddleware = (
    _req: Request,
    _res: Response,
    next: NextFunction
): void => {
    next(notFound('Not Found'));
};

export {notFoundMiddleware};
