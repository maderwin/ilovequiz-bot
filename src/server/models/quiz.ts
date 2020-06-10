import mongoose from 'mongoose';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';

import {QuizData} from '../../common/types/quiz';

import {ILoveQuizProvider} from '../providers';

export type QuizModel = QuizData & mongoose.Document;

const QuizSchemaDefinition: Record<
    keyof QuizData,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mongoose.SchemaTypeOpts<any> | mongoose.Schema | mongoose.SchemaType
> = {
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    season: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    isRegistrationAvailable: {
        type: Boolean,
        required: true,
    },
    isRegistered: {
        type: Boolean,
    },
    updatedAt: {
        type: Date,
        required: true,
    },
};

const QuizSchema = new mongoose.Schema(QuizSchemaDefinition);

const Quiz = mongoose.model<QuizModel>('Quiz', QuizSchema);

interface InsertOp {
    insertOne: {
        document: Partial<QuizData>;
    };
}

interface UpdateOp {
    updateOne: {
        filter: Partial<QuizData>;
        update: Partial<QuizData>;
    };
}

const reduceInsertOps = (upstreamQuizMap: Map<number, QuizData>) => (
    opList: InsertOp[],
    id: number
): InsertOp[] => {
    const quizData = upstreamQuizMap.get(id);
    if (quizData) {
        return [...opList, {insertOne: {document: quizData}}];
    }

    return opList;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
};

const reduceUpdateOps = (upstreamQuizMap: Map<number, QuizData>) => (
    opList: UpdateOp[],
    id: number
): UpdateOp[] => {
    const quizData = upstreamQuizMap.get(id);
    if (quizData) {
        return [...opList, {updateOne: {filter: {id}, update: quizData}}];
    }

    return opList;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
};

const pickFields = Object.keys(QuizSchemaDefinition).filter(
    (key) => ['isRegistered', 'updatedAt'].includes(key) === false
);

const fetchQuizDataFromUpstream = async (): Promise<void> => {
    const upstreamQuizList = await ILoveQuizProvider.getQuizList();

    const upstreamQuizMap = new Map<number, QuizData>(
        upstreamQuizList.map((quizData) => [quizData.id, quizData])
    );

    const existingQuizList = await Quiz.find({
        id: [...upstreamQuizMap.keys()],
    }).exec();

    const existingIdList = existingQuizList.map(({id}) => id as number);

    const updateIdList = existingQuizList
        .filter(
            (quiz) =>
                isEqual(
                    pick(quiz, pickFields),
                    pick(upstreamQuizMap.get(quiz.id), pickFields)
                ) === false
        )
        .map(({id}) => id);

    const insertIdList = [...upstreamQuizMap.keys()].filter(
        (id) => existingIdList.includes(id) === false
    );

    const opList: (InsertOp | UpdateOp)[] = [
        ...insertIdList.reduce(
            reduceInsertOps(upstreamQuizMap),
            [] as InsertOp[]
        ),
        ...updateIdList.reduce(
            reduceUpdateOps(upstreamQuizMap),
            [] as UpdateOp[]
        ),
    ];

    await Quiz.bulkWrite(opList);
};

export {Quiz, fetchQuizDataFromUpstream};
