import {Request, Response} from 'express';

const pingMiddleware = (_req: Request, res: Response): void => res.end();

export {pingMiddleware};
