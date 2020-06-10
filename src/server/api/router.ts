import express from 'express';

import {errorMiddleware} from '../middleware/error';
import {notFoundMiddleware} from '../middleware/not-found';

import {v1Router} from './v1';

const apiRouter = express.Router();

apiRouter.use('/v1', v1Router);
apiRouter.use(notFoundMiddleware);
apiRouter.use(errorMiddleware);

export {apiRouter};
