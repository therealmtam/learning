import React, { useState, createContext } from 'react';
import Navbar from './components/Navbar';
import Planets from './components/Planets';
import People from './components/People';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools' // note: you can't import it directly from 'react-query'. You need to specify the additional /devtools filepath in the import statement to access it. That is because on the exports for the react-query lib, it doesn't export the contents of the devtools folder.

/*
CONTEXT:
https://www.youtube.com/watch?v=5LrDIWkK_Bc

- export the context to be used in child components that need access to it via
> const themeContextData = useContext(ThemeContext);
*/
export const ThemeContext = createContext();

function App() {
    /*
    - https://reactjs.org/docs/hooks-state.html

    - What does useState return? It returns a pair of values: the current state and a function that updates it. This is why we write const [count, setCount] = useState(). This is similar to this.state.count and this.setState in a class, except you get them in a pair. If you’re not familiar with the syntax we used, we’ll come back to it at the bottom of this page.

    - In this example,
        - setPage(_variable to set as the new value of planets_)
        - page is the value
        - useState(__this is the initial value__)
    */
    const [ page, setPage ] = useState('planets');

    /*
    State of a component and data state of react-query - when to use which
    ---------------------------------------
    - A react component should have a query tied to it and also a react hook tied to it. React query is representative of the server-side data state while the react-hook is meant to store that same data as well aside from data that is purely manufactured and generated and stored on the client-side app (ex. a switch between view states when both views already have their server-side data store in react-query).

    - In this example component,

        - the useState (react-hook) is used to store the toggle state of a switch between data for planets and data for people.

        - the useQuery is used to get and store the data fetched from the server for the planets and people views.
    */

    const queryClient = new QueryClient();

    /*
    - for all child components to get access to the client (implicitly) through useQuery method, you need to wrap the children components with the query client provider and pass in an instance of the client.

    */
    return (
        <QueryClientProvider client={queryClient}>

            <ThemeContext.Provider value={{ apple: true }}>

                <div className="App">
                    <h1>Star Wars Info</h1>
                    <Navbar setPage={setPage}/>
                    <div className="content">
                        {page === 'planets' ? <Planets /> : <People />}
                    </div>
                </div>

            </ThemeContext.Provider>

            {/*
            - setting initialIsOpen=false means the tools won't show up by default while opening up the app
            */}

            <ReactQueryDevtools initialIsOpen={false} />

        </QueryClientProvider>
    );
}

export default App;
