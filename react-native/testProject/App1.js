import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import Assistant from './components/Assistant';
import { SocketContext, socket } from './components/context';
import { StyleSheet, Text, View } from 'react-native';

const fetchAccount = async () => {
    console.log('\n');
    console.log('fetchAccount call start');

    const listOfCookieStrings = document.cookie.split('; ');
    const authCookieString = listOfCookieStrings.find(row => row.startsWith('auth='));
    if (!authCookieString) {
        console.log('\n');
        console.log('fetchAccount does not have auth cookie => ', document.cookie);
        return null;
    }

    // ex. authCookieString = 'auth=asdasdada'
    const authToken = authCookieString.split('=')[0];

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    console.log('\n');
    console.log(`fetchAccount call => POST http://localhost:3000/account`);
    console.log(requestOptions);

    let response = {};
    try {
        response = await fetch(`http://localhost:3000/account`, requestOptions);
        response = await response.json();

        console.log('\n');
        console.log('fetchAccount call response => ', response);
    } catch (error) {
        console.log('\n');
        console.log('fetchAccount response error => ', error.message)
    }

    // if there is no user (identified by _id property)
    if (!response.data || !response.data._id) {
        return null;
    }

    return response.data;
    return {
        _id: '123123',
        verified: true
    };
};

function App() {
    // global state of the app
    const [ globalState, setGlobalState ] = useState({ isAuthenticated: false, user: null });

    // state of the users context
    const [ userContext, setUserContext ] = useState({
        activeTabUrl: null,
        tabIsProcessingACommand: null
    });

    // -----------------------
    // fire this only once
    useEffect(async () => {

        console.log('\n');
        console.log('useEffect => fetchAccount if able to');

        const listOfCookieStrings = document.cookie.split('; ');
        const authCookieString = listOfCookieStrings.find(row => row.startsWith('auth=')) || '';
        // ex. authCookieString = 'auth=asdasdada'
        const authToken = authCookieString.split('=')[0];

        /*
        if this is a fresh request to the server for the app and there is a auth= cookie (so the user has not been authenticated and saved in the client state)
        */
        if (authToken && !globalState.isAuthenticated) {
            console.log('\n');
            console.log('useEffect => fetching account using auth cookie');

            const user = await fetchAccount();

            if (user) {
                // set isAuthenticated=true user= the user object
                setGlobalState({ ...globalState, isAuthenticated: true, user });
            }
        }

        if (!authToken) {
            console.log('\n');
            console.log('useEffect => no auth token');
        }

        if (authToken && globalState.isAuthenticated) {
            console.log('\n');
            console.log('useEffect => user already fetched');
        }

        // REMOVE ONCE DONE DEVELOPING - THIS IS TO SKIP LOGIN
        if (!globalState.isAuthenticated) {
            setGlobalState({ ...globalState, isAuthenticated: true, user: {} });
        }
    }, []);
    // -----------------------
    // fire this only once
    useEffect(() => {
        // detect web audio capabilty of the browser
        try {
            // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            window.audioContext = new AudioContext();
        } catch (e) {
            alert('Web Audio API not supported.');
        }

        // ======================
        const assistantAppUrl = 'http://localhost:3000';
        const assistantFromName = 'assistantApp';
        const userContextMessageName = 'user_context'

        const approvedFroms = {
            [assistantFromName]: true,
            "content-script": true,
            background: true,
        };

        // standardize messages
        const createMessage = (type, data) => {
            return {
                from: assistantFromName,
                type,
                data,
            };
        };

        // ======================
        window.addEventListener("message", (event) => {
            const { origin, source } = event;
            const from = event.data && event.data.from;
            const type = event.data && event.data.type;
            const data = event.data && event.data.data || {};

            if (false) {
                console.log('\n');
                console.log('Assistant App - window on message event => ', event.data);
            }

            /*
            we only handle messages from the assistant that
            - originate from the app url
            - source is the same window object
            - the message's "from" is the content-script or the assistantApp (as response to assistantApp's earlier message)
            */
            if (source != window || !origin.includes(assistantAppUrl) || !approvedFroms[from]) {
                return;
            }

            if (true) {
                console.log('\n');
                console.log('Assistant App - window on message event => ');
            }
            console.log('event data => ', data);
            console.log('event origin => ', origin);
            console.log('data from => ', from);
            console.log('type => ', type);

            if (type === 'are you the assistant?') {
                // notify background that the assistant exists
                window.postMessage(createMessage('assistantOnlineNotification'), "*");
            }

            if (data.message === userContextMessageName) {
                /*
                event.data.data = {
                    message: "user_context",
                    data: {
                        activeTabUrl: "https://developer.chrome.com/docs/extensions/reference/runtime/",
                        tabIsProcessingACommand: false
                    }
                }

                store the user's context data into local state
                */
                console.log('user-context - data.data => ', data.data);
                setUserContext(data.data);
            }
        }, false);

    }, []);

    // -----------------------
    return (
        <SocketContext.Provider value={socket}>
            <div className="App">
                { globalState.isAuthenticated === true ?
                    <Assistant globalStateHandler={ { setGlobalState, globalState, userContext } } /> :
                    <Login globalStateHandler={ { setGlobalState, globalState } } />
                }
            </div>
        </SocketContext.Provider>
    );
}

export default App;
