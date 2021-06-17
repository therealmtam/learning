import React from 'react';
import { useQuery } from 'react-query';
import Person from './Person';

const fetchPeople = async () => {
    let res = await fetch('http://swapi.dev/api/people');
    res = await res.json();
    return res;
};

const People = () => {
    const { data, status } = useQuery('people', fetchPeople);

    return (
        <div>
            <h2>People</h2>

            {status === 'error' && (
                <div>Error fetching data</div>
            )}
            {status === 'loading' && (
                <div>loading data...</div>
            )}
            {status === 'success' && (
                <div>{
                    data.results.map(person => (<Person key={person.name} person={person} />))
                }</div>
            )}
        </div>
    );
};

export default People;