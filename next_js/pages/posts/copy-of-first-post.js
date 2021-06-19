import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from "next/router";
import LayoutAdvanced from '../../components/layoutAdvanced';

// for context provider access
import { useContext } from 'react';
import { ThemeContext } from '../_app';

const CopyOfFirstPostSubHeader = () => (
    <h1>First Post</h1>
);

const CopyOfFirstPostMain = () => {

    const router = useRouter();

    const { globalStateValue, toggleGlobalStateValue } = useContext(ThemeContext);

    return (
    <>
        <LayoutAdvanced>
            <Head>
                <title>First Post</title>
            </Head>
            {CopyOfFirstPostSubHeader()}
            <h1>Copy Of First PostB</h1>
            {
                globalStateValue === true &&
                <button onClick={()=> router.push('/') }>redirect me please to home page</button>
            }
            <button onClick={()=> toggleGlobalStateValue(!globalStateValue) }>toggle global state</button>
            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>
            <h2>
                <Link href="/posts/first-post">
                    <a>To First Post</a>
                </Link>
            </h2>
        </LayoutAdvanced>
    </>
)};

export default CopyOfFirstPostMain;

// https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
export async function getServerSideProps(context) {
    const { req, res, query, resolvedUrl, locales, locale, defaultLocale } = context;

    console.log('\n\n');
    console.log('getServerSideProps fired for copy-of-first-post => ');
    console.log('\n\n');

    return {
        props: {
            copy_of_first_post: true
        }
    }
}