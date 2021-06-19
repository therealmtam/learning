import React, { useContext } from 'react';
import { ThemeContext } from '../App';

const Navbar = ({ setPage }) => {

    /*
    CONTEXT - Follow on notes from App.js:
    - to access the context from a given provider at the child level, you need to import the instance of that context and use React.useContext to access it.

    - In react client-side rendered code, the App.js is the top most parent component. Thus, it is always rendered and to pass global state between pages, you can use Context as a mechanism to do so if it has state itself. Or you can use a global state like Redux.

    - In server-side rendered react, the _app.js file is the global wrapper of each and every page. However, it is shared across
    */
    const themeContextData = useContext(ThemeContext);

    console.log('\n\n');
    console.log('themeContextData => ', themeContextData);
    console.log('\n\n');

    return (
        <nav>
            <button onClick={() => setPage('planets')}>Planets</button>
            <button onClick={() => setPage('people')}>People</button>
        </nav>
    );
};

export default Navbar;