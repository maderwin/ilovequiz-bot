import {Agent} from 'https';

import {doRequest, RequestMethod} from '../../lib/do-request';
import {QuizData} from '../../../common/types/quiz';

const ILOVEQUIZ_API_URL = 'https://old.ilovequiz.ru/api';
const SEASON_LIST_ENDPOINT = '/games';

interface UpstreamGame {
    id: number;
    title: string;
    description: string;
    date: string;
    is_registration_available: boolean;
}

interface UpstreamSeason {
    season: string;
    games: UpstreamGame[];
}

const agent = new Agent();

const doUpstreamRequest = <RequestBody, ResponseBody>(
    method: RequestMethod,
    endpoint: string,
    body?: RequestBody
) =>
    doRequest<RequestBody, ResponseBody>(ILOVEQUIZ_API_URL, method, endpoint, {
        agent,
        body,
    });

const convertQuizData = (updatedAt: number) => ({
    is_registration_available: isRegistrationAvailable,
    date,
    ...game
}: UpstreamGame & {season: string}): QuizData => ({
    ...game,
    date: new Date(date).getTime(),
    updatedAt,
    isRegistrationAvailable,
});

const getQuizList = async (): Promise<QuizData[]> => {
    const seasonList = await doUpstreamRequest<unknown, UpstreamSeason[]>(
        RequestMethod.GET,
        SEASON_LIST_ENDPOINT
    );

    const convert = convertQuizData(Date.now());

    return seasonList.reduce(
        (quizList, item) => [
            ...quizList,
            ...item.games.map((game) =>
                convert({...game, season: item.season})
            ),
        ],
        [] as QuizData[]
    );
};

export {getQuizList};
