import Link from 'next/link'
import Head from 'next/head'

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

const FirstPostMain = () => (
    <>
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
        <h2>
            <Link href="/">
                <a>Back to home</a>
            </Link>
        </h2>
    </>
);

export default FirstPostMain;