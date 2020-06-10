import express from 'express';

import {frontendMiddleware} from './middleware/frontend';
import {apiRouter} from './api';
import {pingMiddleware} from './middleware/ping';

const app = express();

app.get('/ping', pingMiddleware)
    .use('/api/', apiRouter)
    .use(frontendMiddleware);

export {app};
