'use strict';

$(document).ready(() => {
    console.log('document.ready');

    const loginButton = $("button#login");
    const secureCallButton = $("button#secure_call");
    const logoutButton = $("button#logout");
    const verifyAccountButton = $("button#verify_account");
    const createAccountButton = $("button#create_account");

    loginButton.click(async () => {
        const payload = {
            username: 'max.c.tam@gmail.com',
            password: '123456',
            rememberMe: true
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
    });

    logoutButton.click(async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        console.log('\n');
        console.log('logout call => POST http://localhost:3000/logout');
        console.log(requestOptions);
        console.log('\n');

        let response = await fetch('http://localhost:3000/logout', requestOptions);
        response = await response.json();

        console.log('\n');
        console.log('logout call response => ', response);
        console.log('\n');
    });

    secureCallButton.click(async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        console.log('\n');
        console.log('secure_info call => GET http://localhost:3000/secure_info');
        console.log(requestOptions);
        console.log('\n');

        let response = await fetch('http://localhost:3000/secure_info', requestOptions);
        response = await response.json();

        console.log('\n');
        console.log('secure_info call response => ', response);
        console.log('\n');
    });

    verifyAccountButton.click(async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        console.log('\n');
        console.log('verifyAccount call => GET http://localhost:3000/account/verify?user_id=___');
        console.log(requestOptions);
        console.log('\n');

        let response = await fetch('http://localhost:3000/account/verify?user_id=60c82aadf3ae6b94b2c0d1fe', requestOptions);
        response = await response.json();

        console.log('\n');
        console.log('verifyAccount call response => ', response);
        console.log('\n');
    });

    createAccountButton.click(async () => {
        const payload = {
            username: 'max.c.tam@gmail.com',
            password: '123456'
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            // send the account creation info to the server
            body: JSON.stringify(payload)
        };

        console.log('\n');
        console.log('createAccount call => POST http://localhost:3000/account');
        console.log(requestOptions);
        console.log('\n');

        let response = await fetch('http://localhost:3000/account', requestOptions);
        response = await response.json();

        console.log('\n');
        console.log('createAccount call response => ', response);
        console.log('\n');
    });
});
