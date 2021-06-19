import React from 'react';
import { useQuery } from 'react-query';
import Planet from './Planet';

const fetchPlanets = async () => {
    let res = await fetch('http://swapi.dev/api/planets');
    res = await res.json();
    return res;
};

const Planets = () => {
    /*
    - THIS IS THE API:

        - useQuery( __key to store it under__  , async function to go fetch the data, options)

        - useQuery always returns with a { data, status } properties where data is the resolved data and status is status of the query.

    - useQuery will manage the times in which it thinks it needs to refetch the data based on
        - interval (certain amount of time so next time the component loads fetch it if the interval has passed)
        - or on reactivation of the tab (ex. toggle to another browser tab to this one and it will attempt to refetch data)

        - useQuery can also use cached data. So maybe on first glance of a page, the data shown is what is in the cache but behind the scenes it will refetch the data and then update the data if there is any change in the data.

            - This is not a great feature for ecommerce where if you land on a page and use cached data, the data could be stale and thus on first page load it is better to have non-cached data.

            - react query also can only cache the data on the initial page load that does the fetch. Subsequent times the user lands on a component in the view, it will use the cached data while fetching the data in the background.

    - the data and status mapping is:
    data=undefined when status=loading
    data=resolvedData when status=success

    - useQuery will attempt to call the api 3 times (ex. if you put the incorrect url, react query will call the api 3 times on its own). While it is calling, each time it calls, the data=undefined and status=loading. So if you show the data and status in the component, the component will rerender each of the 3 times it attempts to call and receives a 404 response or other response.

        - if it fails after 3 attempts, data=undefined, status=error

    - the full list of what useQuery returns is
    {
        "status": "success",
        "isLoading": false,
        "isSuccess": true,
        "isError": false,
        "isIdle": false,
        "data": {
            ... data from the request
        },
        "dataUpdatedAt": 1623904329706,
        "error": null,
        "errorUpdatedAt": 0,
        "failureCount": 0,
        "isFetched": true,
        "isFetchedAfterMount": true,
        "isFetching": false,
        "isLoadingError": false,
        "isPlaceholderData": false,
        "isPreviousData": false,
        "isRefetchError": false,
        "isStale": true
    }

    - see https://react-query.tanstack.com/reference/useQuery for a list of all configs possible for react-query.
    */
    const useQueryOptions = {
        retry: 0, //sets the number of retries after 1st attempt
        initialData: { //initial cache data that is shown to users while it fetches data to update the cache
            results: [
                { name: 'monkey', population: 10000, terrain: 'ugly' }
            ]
        },
        staleTime: 5000, //The time in milliseconds after data is considered stale. This value only applies to the hook it is defined on. Ex. on this 'planet' key of the cache. NOTE - the stale time means that at the time this component is mounted, if there is initial data, a fetch will not happen. Only when the next type of action that triggers this component to rerender (like toggling between browser tabs or pages) then react query will check whether the data is stale based on the stale time and then do a fetch to get the data.

        refetchInterval: 10000, //If set to a number, all queries will continuously refetch at this frequency in milliseconds WHILE the app is in the foreground of the browser. When the browser tab process is in the background, you need to use the refetchIntervalInBackground to have it continuously poll for server data.

    };
    const { data, status } = useQuery('planet', fetchPlanets, useQueryOptions);

    return (
        <div>
            <h2>Planets</h2>

            {status === 'error' && (
                <div>Error fetching data</div>
            )}
            {status === 'loading' && (
                <div>loading data...</div>
            )}
            {status === 'success' && data.results && (
                <div>{
                    data.results.map(planet => (<Planet key={planet.name} planet={planet} />))
                }</div>
            )}
        </div>
    );
};

export default Planets;