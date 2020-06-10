import {Request, Response} from 'express';

import {GetQuizListResponse} from '../../../../../common/types/api/quiz';
import {QuizData} from '../../../../../common/types/quiz';

import {wrapAsyncMiddleware} from '../../../../lib/wrap-async-middleware';
import {filterPrivateFields} from '../../../../lib/utils';

import {Quiz} from '../../../../models/quiz';

const listEndpoint = wrapAsyncMiddleware(
    async (_req: Request, res: Response) => {
        const quizList = await Quiz.find().exec();

        const responseBody: GetQuizListResponse = {
            quizList: quizList.map((quiz) =>
                filterPrivateFields(quiz.toObject() as QuizData)
            ),
        };

        res.json(responseBody);
    }
);

export {listEndpoint};
