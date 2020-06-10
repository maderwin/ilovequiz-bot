import Link from 'next/link';

import {Layout} from '../views/components/layout';

const Header = <h1>About</h1>;

const Nav = (
    <p>
        <Link href="/">
            <a>Go home</a>
        </Link>
    </p>
);

const AboutPage = (): JSX.Element => (
    <Layout title="About | Next.js + TypeScript Example">
        {Header}
        <p>This is the about page</p>
        {Nav}
    </Layout>
);

export default AboutPage;
