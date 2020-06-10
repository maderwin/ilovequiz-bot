import {Request, Response, NextFunction, RequestHandler} from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface AsyncRequestHandler<R = any> extends RequestHandler {
    (req: Request, res: Response, next?: NextFunction): Promise<R>;
}

/**
 * Wrap async middleware, to catch and handle async errors
 */
const wrapAsyncMiddleware = (
    asyncMiddleware: AsyncRequestHandler
): RequestHandler => (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    asyncMiddleware(req, res, next).catch(next);
};

export {wrapAsyncMiddleware};
