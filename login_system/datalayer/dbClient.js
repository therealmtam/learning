'use strict';

const { MongoClient } = require('mongodb');

// =================
// configure the db client
// =================
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017";
const connectionOptions = { poolSize: process.env.MONGO_POOLSIZE ? Number(process.env.MONGO_POOLSIZE) : 1 }
const client = new MongoClient(dbUrl, connectionOptions);

const connectToDB = async () => {
    try {
        if (client.isConnected() === false) {
            await client.connect();
            console.log('\n' + 'connected to db' + '\n');
        } else {
            console.log('\n' + 'already connected to db' + '\n');
        }
    } catch (error) {
        console.log('\n');
        console.log('connection error => ', error.message);
        console.log('\n');

        throw error;
    }

    return client;
};

const getDbClient = () => {
    if (client.isConnected() === false) {
        throw Error('client is not connected');
    }
    return client;
};

const closeDbClient = async () => {
    try {
        await client.close();
    } catch (error) {
        console.log('\n');
        console.log('db close connection error => ', error.message);
        console.log('\n');

        throw error;
    }
}

module.exports = {
    connectToDB,
    getDbClient,
    closeDbClient
};