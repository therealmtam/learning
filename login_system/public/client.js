'use strict';

let authToken = null;
let refreshToken = null;

const getUserObjForTokenDecryption = (username) => ({ name: username })

$(document).ready(() => {
    console.log('document.ready');

    const loginButton = $("button#login");
    const afterButton = $("button#after");
    const refreshButton = $("button#refresh");

    loginButton.click(async () => {
        const payload = {
            username: 'max',
            password: '1234'
        };

        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            // send the login info to the server
            body: JSON.stringify(payload)
        };

        console.log('\n');
        console.log('login call => POST http://localhost:3000/login');
        console.log(requestOptions);
        console.log('\n');

        let response = await fetch('http://localhost:3000/login', requestOptions);
        response = await response.json();

        console.log('\n');
        console.log('login call response => ', response);
        console.log('\n');

        /*
        if user is authenticated (valid username and pwd), expect the auth token in the response = { auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlcm5hbWUiLCJpYXQiOjE2MjM1MzkzMjZ9.kDjUaCCsFMGq0wg7GAYQbUoh3kXPPREPPl0oOdTTuwE", refreshToken: "..." };

        - The auth token can be set as a cookie in the header by the server or sent to the client for the client to then append to the header manually in code
        - The refresh token is usually stored server-side for a user so that the server is the only one that can refresh the token and knows the user wants to persist their authorization
        */

        // set the token globally for reuse
        authToken = response.auth;
        refreshToken = response.refreshToken;
    });

    afterButton.click(async () => {
        const payload = {
            secureInfoToSendToServer: 'asdasda'
        };

        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

                // send the auth token in the header manually which will be decrypted to get the user's name
                auth: authToken
            },

            // send the data needed for the request to be used if the auth token is valie
            body: JSON.stringify(payload)
        };

        console.log('\n');
        console.log('making a secure call => POST http://localhost:3000/after');
        console.log(requestOptions);
        console.log('\n');

        let response = await fetch('http://localhost:3000/after', requestOptions);
        response = await response.json();

        console.log('\n');
        console.log('secure call response => ', response);
        console.log('\n');
    });

    refreshButton.click(async () => {
        console.log('\n\n');
        console.log('refreshToken => ', refreshToken);
        console.log('\n\n');

        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',

                // send the refresh token in the header manually which will be decrypted to get the user's name
                refreshtoken: refreshToken, // <= FYI all headers are lowercase
            }
        };

        console.log('\n');
        console.log('refreshing token call => POST http://localhost:3000/token/refresh');
        console.log(requestOptions);
        console.log('\n');

        let response = await fetch('http://localhost:3000/token/refresh', requestOptions);
        response = await response.json();

        console.log('\n');
        console.log('refresh token response => ', response);
        console.log('\n');

        /*
        if the refresh token was valid, it would be used to generate a new auth token
        */
        // set the new auth token globally for reuse
        authToken = response.auth;
    });
});
