'use strict';

const { ObjectId } = require('mongodb');
const { getDbClient } = require('./dbClient.js');

// create user (username, password)
const createUser = async (username, password) => {
    const dataToReturn = {
        user: null,
        error: null
    };

    try {
        const dbClient = getDbClient();
        const { ops, insertedCount, insertedId } = await dbClient.db("assistant").collection("users").insertOne({
            username,
            password
        });

        console.log('New user created: ', ops);

        /*
        - ops = [ { username: 'max', password: 'asasd', _id: 60c6ea445820105f7faf52cf } ]
        - insertedCount = 1
        - insertedId = 60c6ea445820105f7faf52cf
        */
        dataToReturn.user = ops[0]
    } catch (error) {
        console.log('\n');
        console.log('error during createUser => ', error.message);

        dataToReturn.error = error.message
    }

    return dataToReturn;
};

const _findOneUser = async (lookupKeys) => {
    const dbClient = getDbClient();
    const foundUserOrNull = await dbClient.db("assistant").collection("users").findOne(lookupKeys);

    // foundUserOrNull = null || { _id: 60c29c7b15e7f620c658c2c5, username: 'max', password: '12123' }
    return foundUserOrNull;
};

// get/find user by userId
const findUserByUserId = async (userId) => {
    const dataToReturn = {
        user: null,
        error: null
    };

    try{
        const foundUserOrNull = await _findOneUser({ _id: ObjectId(userId) });

        console.log('result of findUserByUserId: ', foundUserOrNull);

        // foundUserOrNull = null || { _id: 60c29c7b15e7f620c658c2c5, username: 'max', password: '12123' }
        dataToReturn.user = foundUserOrNull;
    } catch (error) {
        console.log('\n');
        console.log('error during findUserByUserId => ', error.message);

        dataToReturn.error = error.message
    }

    return dataToReturn;
};

// get/find user by username
const findUserByUsername = async (username) => {
    const dataToReturn = {
        user: null,
        error: null
    };

    try{
        const foundUserOrNull = await _findOneUser({ username });

        console.log('result of findUserByUsername: ', foundUserOrNull);

        // foundUserOrNull = null || { _id: 60c29c7b15e7f620c658c2c5, username: 'max', password: '12123' }
        dataToReturn.user = foundUserOrNull;
    } catch (error) {
        console.log('\n');
        console.log('error during findUserByUsername => ', error.message);

        dataToReturn.error = error.message
    }

    return dataToReturn;
};

// update user by userId
const _updateUserByUserId = async (userId, userKeyValuesToUpdate, removeKeys = false) => {
    const dataToReturn = {
        modifiedCount: null,
        error: null
    };

    try {
        let updateConfig = {};
        if (removeKeys) {
            updateConfig = {
                '$unset': userKeyValuesToUpdate
            };
        } else {
            updateConfig = {
                '$set': userKeyValuesToUpdate
            };
        }

        console.log('\n\n');
        console.log('updateConfig => ', updateConfig);
        console.log('userId => ', userId);
        console.log('\n\n');

        const dbClient = getDbClient();
        const { result, modifiedCount, matchedCount } = await dbClient.db("assistant").collection("users").updateOne({ _id: ObjectId(userId) }, updateConfig);

        console.log('result of updateUserByUserId: ', result, modifiedCount, matchedCount);

        /*
        - result = { n: 1, nModified: 0, ok: 1 }
        - modifiedCount = 1
        - matchedCount = 1
        */
        dataToReturn.modifiedCount = modifiedCount;
    } catch (error) {
        console.log('\n');
        console.log('error during updateUserByUserId => ', error.message);

        dataToReturn.error = error.message
    }

    return dataToReturn;
};

const updateUserWithVerified = async (userId) => {
    return await _updateUserByUserId(userId, {
        verified: true
    }, false);
};


module.exports = {
    createUser,
    findUserByUserId,
    findUserByUsername,
    updateUserWithVerified
};
