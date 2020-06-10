import Link from 'next/link';
import {GetStaticProps, GetStaticPropsContext} from 'next';

import {QuizData} from '../../common/types/quiz';

import {Layout} from '../views/components/layout';

interface Props {
    quizList: QuizData[];
    context: GetStaticPropsContext;
}

const quizRenderFields: (keyof QuizData)[] = [
    'id',
    'date',
    'season',
    'title',
    'description',
    'isRegistrationAvailable',
    'isRegistered',
    'updatedAt',
];

const renderQuiz = (quiz: QuizData): JSX.Element => (
    <tr key={quiz.id}>
        {quizRenderFields.map((key) => (
            <td key={key}>{String(quiz[key])}</td>
        ))}
    </tr>
);

const Header = <h1>Hello Next.js 👋</h1>;

const Nav = (
    <p>
        <Link href="/about">
            <a>About</a>
        </Link>
    </p>
);

const IndexPage = ({context, quizList}: Props): JSX.Element => (
    <Layout title="Home | Next.js + TypeScript Example">
        {Header}
        {Nav}
        <pre>{JSON.stringify(context, null, 2)}</pre>
        <table>{quizList.map(renderQuiz)}</table>
    </Layout>
);

export const getStaticProps: GetStaticProps<Props> = async (context) => ({
    props: {
        quizList: [],
        context,
    },
});

export default IndexPage;
