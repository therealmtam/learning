'use strict';

const express = require('express');
const app = express();
//--------------------
const axios = require('axios');
const _ = require('lodash');

// =================
// configure the server
// =================
const port = 4000;

// =================
// register RESTful routes
// =================
app.get('/test', (req, res) => res.send('test is good!'));

// =================
// middleware
// =================

// https://adam-marsden.co.uk/css-cheat-sheet
app.use(express.static('dist', {
    /*
    http://expressjs.com/en/resources/middleware/serve-static.html

    - extensions option will auto-append these to the url so if the url is /nextpage without the .html after, it will append these extensions in search of these files in the "dist" directory
    */
    extensions: ['html', 'htm']
}));

// =================
// start / turn-on the server
// =================
app.listen({ port }, () => {
    console.log(
        `RESTful endpoints are ready at => http://localhost:${port}/_your_endpoint_path_`
    );
});
