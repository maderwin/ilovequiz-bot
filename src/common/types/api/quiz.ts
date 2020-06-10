import {QuizData} from '../quiz';

export interface GetQuizRequestParams {
    id: number;
}

export interface GetQuizListResponse {
    quizList: QuizData[];
}

export interface GetQuizResponse {
    quiz: QuizData;
}
