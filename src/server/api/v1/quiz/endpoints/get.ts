import {Request, Response} from 'express';
import * as boom from '@hapi/boom';

import {
    GetQuizResponse,
    GetQuizRequestParams,
} from '../../../../../common/types/api/quiz';
import {QuizData} from '../../../../../common/types/quiz';

import {wrapAsyncMiddleware} from '../../../../lib/wrap-async-middleware';
import {filterPrivateFields} from '../../../../lib/utils';
import {Joi} from '../../../../lib/joi';

import {Quiz} from '../../../../models/quiz';

const paramsValidator = Joi.object<GetQuizRequestParams>({
    id: Joi.number().required(),
});

const getEndpoint = wrapAsyncMiddleware(async (req: Request, res: Response) => {
    const {errors, value} = paramsValidator.validate(req.params);

    if (errors) {
        throw boom.badRequest('Validation error', errors);
    }

    const {id} = value as GetQuizRequestParams;

    const quiz = await Quiz.findOne({id}).exec();

    if (!quiz) {
        throw boom.badRequest('Not found');
    }

    const responseBody: GetQuizResponse = {
        quiz: filterPrivateFields(quiz.toObject() as QuizData),
    };

    res.json(responseBody);
});

export {getEndpoint};
