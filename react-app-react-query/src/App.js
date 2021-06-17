import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Planets from './components/Planets';
import People from './components/People';
import { QueryClient, QueryClientProvider } from 'react-query'
 import { ReactQueryDevtools } from 'react-query/devtools' // note: you can't import it directly from 'react-query'. You need to specify the additional /devtools filepath in the import statement to access it. That is because on the exports for the react-query lib, it doesn't export the contents of the devtools folder.


function App() {
    const [ page, setPage ] = useState('planets');

    const queryClient = new QueryClient();

    /*
    - for all child components to get access to the client (implicitly) through useQuery method, you need to wrap the children components with the query client provider and pass in an instance of the client.

    */
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <h1>Star Wars Info</h1>
                <Navbar setPage={setPage}/>
                <div className="content">
                    {page === 'planets' ? <Planets /> : <People />}
                </div>
            </div>

            {/*
            - setting initialIsOpen=false means the tools won't show up by default while opening up the app
            */}

            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
