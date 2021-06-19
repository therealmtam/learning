import Head from 'next/head'

import Link from 'next/link'
import Image from 'next/image'

import Layout, { siteTitle } from '../components/layoutAdvanced'
import utilStyles from '../styles/utils.module.css'

/*
https://nextjs.org/learn/basics/navigate-between-pages/pages-in-nextjs

- pages/index.js is associated with the / route
- The component can have any name (in this example it is Home), but you must export it as a default export which is all that matters AND you need to name it with capital letter.

    https://reactjs.org/docs/components-and-props.html#function-and-class-components - React treats components starting with lowercase letters as DOM tags. For example, <div /> represents an HTML div tag, but <Welcome /> represents a component and requires Welcome to be in scope. To learn more about the reasoning behind this convention, please read JSX In Depth.

=> export default function thatReturnsJSX() { return (...a react component in JSX) }
*/
export default function Home(props) {
    /*
    - when you specify
    <Layout home>, the "home" word is a param that will be passed into the layout component as the boolean value true:

        So in the layoutAdvances.js, the home key = true

        export default function Layout({ children, home }) {}

    */
    return (
        <Layout home>
        <Head>
            <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
            <p>[Your Self Introduction]</p>
            <p>
            (This is a sample website - you’ll be building a site like this on{' '}
            <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
            </p>
        </section>
        </Layout>
    )
}

/*
https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering

- getServerSideProps, getInitialProps has a context

    context = {
        .. some other keys... see docs ^ for thie getServerSideProps
        params:...,
        req: requestObjectWithHeaderCookiesEtc.,
        res: responseObject,
        query: { apple: true, ..this holds query string params from the url },
        resolvedUrl: '/posts/copy-of-first-post?apple=true', //this is the full url
        locales: undefined,
        locale: undefined,
        defaultLocale: undefined
    }

- getServerSideProps and getInitialProps fire on every page request, client and server-side rendered requests.

- For authentication, this method or in the _app.js (the global method following this method call) is where you would perform authentication for all pages (use _app.js), for only secure pages, (use the individual page's getServerSideProps). So when a request comes in, in the getServerSideProps, you can do the check  for a secure page and redirect to login. After you login, you need the global state of your app (stored client-side via the _app.js) to redirect you back to the protected page you wanted to go to.

If you do a server-side request to a secure page, in the getServerSideProps, you would do the same thing, reroute the user to the login page. The user will get the data store in the _app.js.
*/
export async function getServerSideProps() {
    return {
        props: {
            apple: 'tree'
        },

        /*
        - https://aboutmonica.com/blog/creating-protected-routes-in-next-js-with-supabase
        - this is how you dynamically redirect in next.js before rendering the page. So if you mamek an auth call here to validate the auth token before accessing what would be a secure page, you can redirect back to the login page. But after login, we would need to reroute back to this page somehow.

        One way is to do a redirect to the login page, and when the user hits login using their username and password, they will send a request to the login api which returns success or failure to the client and the login page on the client then will need to redirect to the previous page the user was trying to access. The way the login page knows the previous page is for there to somehow be props to pass into the login page

        */
        // redirect: { destination: "/posts/first-post", permanent: true }
    }
}

// export default function Home() {
//   return (
//     <div className="container">
//       <Head>
//         <title>Create Next App</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main>
//         <h1 className="title">
//           Learn
//           {/* page linking done using a tag */}
//           <a href="https://nextjs.org">Next.js!</a>
//         </h1>

//         <h1 className="title">
//           Learn

//           {/*
//           - page linking done using a tag
//           - this type of linking makes each page server-side rendered since it is making a request for all the html
//           */}

//           <a href="http://localhost:5000/posts/first-post">Next.js!</a>
//         </h1>

//         <h1 className="title">
//             Read{' '}

//             {/*
//             - page linking done using next's Link
//             - this type of linking makes each page client-side rendered since the first request pulled the react-app

//             https://nextjs.org/learn/basics/navigate-between-pages/client-side

//             In a production build of Next.js, whenever Link components appear in the browser’s viewport, Next.js automatically prefetches the code for the linked page in the background. By the time you click the link, the code for the destination page will already be loaded in the background, and the page transition will be near-instant!

//             */ }

//             <Link href="/posts/first-post">
//                 <a>this page!</a>
//             </Link>
//         </h1>

//         <p className="description">
//           Get started by editing <code>pages/index.js</code>
//         </p>

//         <div className="grid">
//           <a href="https://nextjs.org/docs" className="card">
//             <h3>Documentation &rarr;</h3>
//             <p>Find in-depth information about Next.js features and API.</p>
//           </a>

//           <a href="https://nextjs.org/learn" className="card">
//             <h3>Learn &rarr;</h3>
//             <p>Learn about Next.js in an interactive course with quizzes!</p>
//           </a>

//           <a
//             href="https://github.com/vercel/next.js/tree/master/examples"
//             className="card"
//           >
//             <h3>Examples &rarr;</h3>
//             <p>Discover and deploy boilerplate example Next.js projects.</p>
//           </a>

//           <a
//             href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className="card"
//           >
//             <h3>Deploy &rarr;</h3>
//             <p>
//               Instantly deploy your Next.js site to a public URL with Vercel.
//             </p>
//           </a>
//         </div>
//       </main>

//       <footer>
//         <a
//           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by{' '}

//             {/*
//             https://nextjs.org/learn/basics/assets-metadata-css/assets
//             - <img> tags are unoptimized

//                 This means you have to manually handle:
//                 - Ensuring your image is responsive on different screen sizes
//                 - Optimizing your images with a third-party tool or library
//                 - Only loading images when they enter the viewport
//             */}

//             <img src="/vercel.svg" alt="Vercel" className="logo" />

//             {/*
//             https://nextjs.org/learn/basics/assets-metadata-css/assets

//             - Instead of optimizing images at build time, Next.js optimizes images on-demand, as users request them. Unlike static site generators and static-only solutions, your build times aren't increased, whether shipping 10 images or 10 million images.

//             - Images are lazy loaded by default. That means your page speed isn't penalized for images outside the viewport. Images load as they are scrolled into viewport.
//             */}
//             <Image
//                 className="logo"
//                 src="/images/vercel.svg" // Route of the image file
//                 height={16} // Desired size with correct aspect ratio
//                 width={70.75} // Desired size with correct aspect ratio
//                 alt="Vercel"
//             />
//         </a>
//       </footer>

//         {/*
//         https://nextjs.org/learn/basics/assets-metadata-css/css-styling
//         - This page is using a library called styled-jsx. It’s a “CSS-in-JS” library — it lets you write CSS within a React component, and the CSS styles will be scoped (other components won’t be affected).

//         - Next.js has built-in support for styled-jsx, but you can also use other popular CSS-in-JS libraries such as styled-components or emotion
//         */}
//       <style jsx>{`
//         .container {
//           min-height: 100vh;
//           padding: 0 0.5rem;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//         }

//         main {
//           padding: 5rem 0;
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//         }

//         footer {
//           width: 100%;
//           height: 100px;
//           border-top: 1px solid #eaeaea;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//         }

//         footer img {
//           margin-left: 0.5rem;
//         }

//         footer a {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//         }

//         a {
//           color: inherit;
//           text-decoration: none;
//         }

//         .title a {
//           color: #0070f3;
//           text-decoration: none;
//         }

//         .title a:hover,
//         .title a:focus,
//         .title a:active {
//           text-decoration: underline;
//         }

//         .title {
//           margin: 0;
//           line-height: 1.15;
//           font-size: 4rem;
//         }

//         .title,
//         .description {
//           text-align: center;
//         }

//         .description {
//           line-height: 1.5;
//           font-size: 1.5rem;
//         }

//         code {
//           background: #fafafa;
//           border-radius: 5px;
//           padding: 0.75rem;
//           font-size: 1.1rem;
//           font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
//             DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
//         }

//         .grid {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           flex-wrap: wrap;

//           max-width: 800px;
//           margin-top: 3rem;
//         }

//         .card {
//           margin: 1rem;
//           flex-basis: 45%;
//           padding: 1.5rem;
//           text-align: left;
//           color: inherit;
//           text-decoration: none;
//           border: 1px solid #eaeaea;
//           border-radius: 10px;
//           transition: color 0.15s ease, border-color 0.15s ease;
//         }

//         .card:hover,
//         .card:focus,
//         .card:active {
//           color: #0070f3;
//           border-color: #0070f3;
//         }

//         .card h3 {
//           margin: 0 0 1rem 0;
//           font-size: 1.5rem;
//         }

//         .card p {
//           margin: 0;
//           font-size: 1.25rem;
//           line-height: 1.5;
//         }

//         .logo {
//           height: 1em;
//         }

//         @media (max-width: 600px) {
//           .grid {
//             width: 100%;
//             flex-direction: column;
//           }
//         }
//       `}</style>

//         {/*
//         - this is the global styling for the home page (/ route page). This similar to using _app.js and importing a css style to be present in every page.
//         */}
//       <style jsx global>{`
//         html,
//         body {
//           padding: 0;
//           margin: 0;
//           font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
//             Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
//             sans-serif;
//         }

//         * {
//           box-sizing: border-box;
//         }
//       `}</style>
//     </div>
//   )
// }