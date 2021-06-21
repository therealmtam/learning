/*
https://nextjs.org/learn/basics/assets-metadata-css/layout-component

- note how there is an inheirent "children" property on wrapper components which consists of all the children html components.

    So if you console.log(children), you will get something like:

    prints => [
        {
            '$$typeof': Symbol(react.element),
            type: [Function: Head] { rewind: [Function] },
            key: null,
            ref: null,
            props: { children: [Object] },
            _owner: null,
            _store: {}
        },
        {
            '$$typeof': Symbol(react.element),
            type: 'section',
            key: null,
            ref: null,
            props: { className: 'utils_headingMd__3de6G', children: [Array] },
            _owner: null,
            _store: {}
        }
    ]

- Important: To use CSS Modules, the CSS file name must end with .module.css.

    otherwise if you named the css file as (layout.module copy.css) and in this layout.js you did an (import styles from './layout.module copy.css') you end up with this error in the terminal during Next.js compilation:

        error - ./components/layout.module copy.css
        Global CSS cannot be imported from files other than your Custom <App>.
        Please move all global CSS imports to pages/_app.js. Or convert the import to Component-Level CSS (CSS Modules).
        Read more: https://nextjs.org/docs/messages/css-global
        Location: components/layout.js

    this is because as shown in the error message, css imports at the component or page level require that imported css sheets are named with __.module.css.

- This is what CSS Modules does: It automatically generates unique class names. As long as you use CSS Modules, you don’t have to worry about class name collisions.

ex. <div class="layout_container__2t4v2"> ...children components </div>

- notice how styles are used as the class name =>
    - console.log(styles.container) prints "layout_container__2t4v2".
    - console.log(styles) prints
        {
            container: "layout_container__2t4v2",
            header: "layout_header__2rhWq",
            backToHome: "layout_backToHome__1vZsp"
        }
    - so you can see the imported styles are all just the classNames of the specific styles as indexed by React or Next.js. These frameworks will auto generate classNames for all your style sheets and allow you to tag your components to be targeted by these styles.

        This also means that when defining styles, you are intending to rely a little less on inheiritance of styles from parent to child and more on child styles being the main driver of the style of something.

*/

/*
NOTE - WE DO NOT HAVE TO IMPORT REACT FOR EVERY COMPONENT LIKE IN REGULAR REACT APPS BECAUSE NEXT DOES THIS FOR YOU.

https://www.freecodecamp.org/news/an-introduction-to-next-js-for-everyone-507d2d90ab54/
*/
import styles from './layout.module.css'

const Layout = ({ children }) => {
    return (
    <div className={styles.container}>
        {children}
    </div>
)};

export default Layout;


/*
next steps, do server-side getServerSideProps on initial fetch, then use react-hooks and react-query to do the login and fetch data.

For react query, set the fetch interval to be default of 0 so it always fetches.

So if you go to /pasad page, next will render the page given its own header etc.
On initial call to server, it should take in a cookie to do some calls to determine what page to show the user, either the login
*/