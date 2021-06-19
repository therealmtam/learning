/*
https://nextjs.org/learn/basics/assets-metadata-css/global-styles
- /pages/_app.js is where you can apply global configs that will be passed to EVERY PAGE component

- we can think of this component being a wrapper around each page

- In Next.js, you can add global CSS files by importing them from pages/_app.js. BUT you cannot import global CSS anywhere else.

The reason that next.js doesn't allow (or you shouldn't try to have) global CSS to be imported into individual pages except here (_app.js) is that global CSS affects all elements on the page and would thus affect all follow-on client-side rendered pages.

So to make it clean to define the styling for a given page, apply global css styling here.

- Global styling is overridden by child level styles at the component level.
*/

/*
- as long as you "import" the css style here, you will import the global styling.

ex. both of these will create the <style> tag in the rendered html
import styles from '../styles/global_imported_as_module.css'
import '../styles/global.css'

- this is different than how CSS modules are imported and are required to be named ending with .module.css.

- if we comment out the import statments for styles, the <style> will not appear.
*/
import styles from '../styles/global_imported_as_module.css'
// import '../styles/global.css'

// for context provider
import { createContext, useState } from 'react';
export const ThemeContext = createContext();

/*
- Component is a page's parent component
- pageProps is the initial props for the page from getServerSideProps or getInitialProps etc that will fetch the props for the entire page.

Therefore, this App function (i.e., whatever is default exported by the _app.js file), is called after ex. getServerSideProps, gets called and will then let you do things to the page component like provide context, global style the page, create a global state using react hooks, etc.
*/
const App = ({ Component, pageProps }) => {

    console.log('\n\n');
    console.log('Component => ', Component);
    console.log('pageProps => ', pageProps); // on the / path, the getServerSideProps props return value will show up here
    console.log('\n\n');

    // global hook (basically global data store)
    const [ globalStateValue, toggleGlobalStateValue ] = useState(true);

    return (
        <ThemeContext.Provider value={{ globalStateValue, toggleGlobalStateValue }}>
            <Component {...pageProps} />
        </ThemeContext.Provider>
    );
}

export default App;