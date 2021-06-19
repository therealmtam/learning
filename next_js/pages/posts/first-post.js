import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from "next/router";
import Layout from '../../components/layout';
import LayoutAdvanced from '../../components/layoutAdvanced';

// for context provider access
import { useContext } from 'react';
import { ThemeContext } from '../_app';

/*
- the route to this page is /posts/first-post

Linking:
-------
When linking between pages on websites, you use the <a> HTML tag.

In Next.js, you use the Link Component from next/link to wrap the <a> tag. <Link> allows you to do client-side navigation to a different page in the application.
*/

const FirstPostSubHeader = () => (
    <h1>First Post</h1>
);

const FirstPostMain = (props) => {
    // for use in dynamic routing
    const router = useRouter();

    // for context access
    const { globalStateValue, toggleGlobalStateValue } = useContext(ThemeContext);

    return (
    <>
        {/*
        https://nextjs.org/learn/basics/assets-metadata-css/layout-component
        - you can use a wrapper component to purely style the components beneath like using this new Layout component to assign styling to the below children components.
        -
        */}
        {/* <Layout> */}
        <LayoutAdvanced>

            {/*
            https://nextjs.org/learn/basics/assets-metadata-css/metadata
            - you can create a different <head> tag for each page by using the variable Head component
            */}
            <Head>
                {/*
                - you can add meta, scripts, whatever you typically place in a <head> tag here
                */}
                <title>First Post</title>
            </Head>

            {/* one way to get a view component during runtime */}
            {FirstPostSubHeader()}

            {/* another one way to get a view component during runtime */}
            <h1>First PostB</h1>


                {/*
                - Test of how to toggle global state
                */}
                {
                    globalStateValue === true &&
                    <button onClick={()=> router.push('/') }>redirect me please to home page</button>
                }
                <button onClick={()=> toggleGlobalStateValue(!globalStateValue) }>toggle global state</button>

            {/*
            - https://aboutmonica.com/blog/creating-protected-routes-in-next-js-with-supabase
            - this is how you redirect dyamically within a component. You use the router to push the path you want based on a condition.
            */}
            <button onClick={()=> router.push('/') }>redirect me please to home page</button>

            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>
            <h2>
                <Link href="/posts/copy-of-first-post">
                    <a>To Copy Of First Post</a>
                </Link>
            </h2>
        </LayoutAdvanced>
        {/* </Layout> */}
    </>
)};

export default FirstPostMain;

export async function getServerSideProps() {
    console.log('\n\n');
    console.log('getServerSideProps fired for first-post => ');
    console.log('\n\n');

    return {
        props: {
            first_post: true
        }
    }
}