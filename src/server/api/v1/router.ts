import express from 'express';
import {quizRouter} from './quiz';

const v1Router = express.Router();

v1Router.use('/quiz', quizRouter);

export {v1Router};
