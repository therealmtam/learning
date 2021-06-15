'use strict';

const { getDbClient } = require('./dbClient.js');

// store tokens (auth and refresh)
const storeTokens = async (authToken, refreshToken) => {
    const dataToReturn = {
        tokens: null,
        error: null
    };

    try {
        const dbClient = getDbClient();
        const { ops, insertedCount, insertedId } = await dbClient.db("assistant").collection("tokens").insertOne({
            auth_token: authToken,
            refresh_token: refreshToken
        });

        console.log('successfully saved tokens: ', ops);

        /*
        - ops = [ { auth_token: '123123', refresh_token: 'asasd', _id: 60c6ea445820105f7faf52cf } ]
        - insertedCount = 1
        - insertedId = 60c6ea445820105f7faf52cf
        */
        dataToReturn.tokens = ops[0]
    } catch (error) {
        console.log('\n');
        console.log('error during storeTokens => ', error.message);

        dataToReturn.error = error.message
    }

    return dataToReturn;
};

// get/find tokens by auth token
const findTokensByAuthToken = async (authToken) => {
    const dataToReturn = {
        tokens: null,
        error: null
    };

    try{
        const dbClient = getDbClient();
        const foundTokensOrNull = await dbClient.db("assistant").collection("tokens").findOne({ auth_token: authToken });

        console.log('result of findTokenByAuthToken: ', foundTokensOrNull);

        // foundTokensOrNull = null || { _id: 60c29c7b15e7f620c658c2c5, auth_token: '123123', refresh_token: '12123' }
        dataToReturn.tokens = foundTokensOrNull;
    } catch (error) {
        console.log('\n');
        console.log('error during findTokenByAuthToken => ', error.message);

        dataToReturn.error = error.message
    }

    return dataToReturn;
};

// update auth token associated with refresh token
const updateAuthToken = async (newAuthToken, refreshToken) => {
    const dataToReturn = {
        modifiedCount: null,
        error: null
    };

    try {
        const dbClient = getDbClient();
        const { result, modifiedCount, matchedCount } = await dbClient.db("assistant").collection("tokens").updateOne({ refresh_token: refreshToken }, { '$set': { auth_token: newAuthToken }});

        console.log('result of updateAuthToken: ', result, modifiedCount, matchedCount);

        /*
        - result = { n: 1, nModified: 0, ok: 1 }
        - modifiedCount = 1
        - matchedCount = 1
        */
        dataToReturn.modifiedCount = modifiedCount;
    } catch (error) {
        console.log('\n');
        console.log('error during updateAuthToken => ', error.message);

        dataToReturn.error = error.message
    }

    return dataToReturn;
};

// delete auth token and refresh token pair
const deleteAuthToken = async (authToken) => {
    const dataToReturn = {
        deletedCount: null,
        error: null
    };

    try {
        const dbClient = getDbClient();
        const { result, deletedCount } = await dbClient.db("assistant").collection("tokens").deleteOne({ auth_token: authToken });

        console.log('result of deleteAuthToken: ', result, deletedCount);

        /*
        - result: { n: 1, ok: 1 },
        - deletedCount: 1,
        */
        dataToReturn.deletedCount = deletedCount;
    } catch (error) {
        console.log('\n');
        console.log('error during deleteAuthToken => ', error.message);

        dataToReturn.error = error.message
    }

    return dataToReturn;
};


module.exports = {
    storeTokens,
    updateAuthToken,
    findTokensByAuthToken,
    deleteAuthToken
};
