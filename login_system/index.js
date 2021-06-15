'use strict';

const serverStart = require('./server.js');
const { connectToDB } = require('./datalayer/dbClient.js');

const main = async () => {
    // connect to the db
    await connectToDB();

    // start the server
    await serverStart();

    return;
};

main();