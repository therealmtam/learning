'use strict';

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

// =================
// load env vars from .env file
// =================
require('dotenv').config();

// =================
// configure the server
// =================
const port = 3000;

// =================
// register RESTful routes
// =================
app.use(express.static('./public'))

// install body-parser middleware manually since it is no longer packaged with express as of 2020 https://stackoverflow.com/questions/9177049/express-js-req-body-undefined
const bodyParser = require('body-parser');
app.use(bodyParser.json())

// =================
// register RESTful routes
// =================
const getUserObjUsedToGenerateAuthToken = (username) => ({ name: username });


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    console.log('\n');
    console.log('POST /login using req.body => ', req.body);
    console.log('\n');

    // authenticate user by validating the username and password
    // -------------------------
    /*
    TODO -
    const password = req.body.password;
    - use bcrypt to generate the password hash
    - get the password has of the user in the db using the username as lookup key
    - compare the bcrypted password hash against the db value
    - if passwordHash === db's passwordHash => then user is authentic and process
    - else return 401 unauthorized response
    */

    // authorize user by generating auth token and returning it to the user
    // -------------------------

    // use the login username to generate the auth token
    const userObjUsedToGenerateAuthToken = getUserObjUsedToGenerateAuthToken(username);

    // for without refresh token case
    // authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlcm5hbWUiLCJpYXQiOjE2MjM1MzUwMjJ9.7Hh7IaIjMlFcGB9V6GOvQ16VixI0jNmFCEFiWocCsVM';
    // const authToken = jwt.sign(userObjUsedToGenerateAuthToken, process.env.ACCESS_TOKEN_SECRET);

    // for refresh token case
    const refreshToken = jwt.sign(userObjUsedToGenerateAuthToken, process.env.REFRESH_TOKEN_SECRET);
    const authToken = jwt.sign(userObjUsedToGenerateAuthToken, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5s' }); // sets a timelimit on the authToken for refresh token functionality

    // return the auth token
    res.json({ auth: authToken, refreshToken });
});

app.post('/after', (req, res) => {
    // validating authorization which is sent in the header
    const authToken = req.headers.auth;

    console.log('\n');
    console.log('POST /after using authToken => ', authToken);
    console.log('\n');

    try {
        // verify the token is valid - if valid should return the userObj used to generate the auth token, else it will throw an error
        const userObjWithMetaDataFromJwt = jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET);
        // userObjWithMetaDataFromJwt = { name: 'max', iat: 1623555038 } <= comes with iat for refresh token functionality based on issued-at time

        console.log('\n');
        console.log('token is valid => ', userObjWithMetaDataFromJwt);
        console.log('\n');

        // use the username to do follow-on secure actions
        // TODO - do something secure here
    } catch (error) {
        console.log('\n');
        console.log('error => ', error.message);
        console.log('\n');

        res.json({ error: error.message });
    }

    res.json({ hooray: 'auth token was valid and we did the secure action!'})
});

app.get('/token/refresh', (req, res) => {
    const refreshToken = req.headers.refreshtoken;

    console.log('\n');
    console.log('GET token/refresh using refreshToken => ', refreshToken);
    console.log('\n');

    // TODO - validate that the request has a refresh token
    // TODO - validate that the refresh token is saved in the db

    let newAuthToken = null
    try {
        // verify the refreshToken is valid - if valid should return the userObj used to generate the auth token, else it will throw an error
        const userObjWithMetaDataFromJwt = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        // userObjWithMetaDataFromJwt = { name: 'max', iat: 1623555038 } <= comes with iat for refresh token functionality based on issued-at time

        console.log('\n');
        console.log('refresh token is valid => ', userObjWithMetaDataFromJwt);
        console.log('\n');

        // if valid, generate a new authToken using the original userObj schema to generate a new auth tokent
        const userObjUsedToGenerateAuthToken = getUserObjUsedToGenerateAuthToken(userObjWithMetaDataFromJwt.name)

        newAuthToken = jwt.sign(userObjUsedToGenerateAuthToken, process.env.ACCESS_TOKEN_SECRET);

    } catch (error) {
        console.log('\n');
        console.log('error => ', error.message);
        console.log('\n');

        return res.json({ error: error.message });
    }

    // return the new auth token, the refreshToken does not need to be recreated
    res.json({ auth: newAuthToken });
});

// =================
// start / turn-on the server
// =================
app.listen({ port }, () => {
    console.log(
        `RESTful endpoints are ready at => http://localhost:${port}/_your_endpoint_path_`
    );
});
