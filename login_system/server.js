'use strict';

const express = require('express');
const app = express();

// =================
// load env vars from .env file
// =================
require('dotenv').config();

// =================
// configure the server
// =================
const port = 3000;

// =================
// register middleware
// =================
app.use(express.static('./public'))

const cookieParser = require('cookie-parser')
app.use(cookieParser());

// install body-parser middleware manually since it is no longer packaged with express as of 2020 https://stackoverflow.com/questions/9177049/express-js-req-body-undefined
const bodyParser = require('body-parser');
app.use(bodyParser.json())

// =================
// register RESTful routes
// =================
const registerRoutes = require('./routes');
registerRoutes(app);

// =================
// start / turn-on the server
// =================
const start = () => {
    return new Promise((resolve, reject) => {
        // start the server
        app.listen({ port }, () => {
            console.log(`Server started at => http://localhost:${port}`);
            resolve();
        });
    }).catch((error) => {
        console.log(`failed to start server => ${error.message}`);
    });
};

module.exports = start;

