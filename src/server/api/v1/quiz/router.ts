import express from 'express';
import {listEndpoint, getEndpoint} from './endpoints';

const quizRouter = express.Router();

quizRouter.get('/', listEndpoint);
quizRouter.get('/:id', getEndpoint);

export {quizRouter};
