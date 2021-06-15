'use strict';

const utils = require('../utils.js');
const usersDL = require('../datalayer/users.js');

const verifyAccountHandler = async (request, response) => {
    const { user_id } = request.query;

    console.log('\n');
    console.log('GET /account/verify?user_id=__ verifyAccountHandler => ', user_id);

    // note - mongodb _id is 24 hex chars long
    if (!user_id || user_id.length !== 24) {
        return response.status(400).json(utils.getResponseObj('user_id is invalid'));
    }

    // set the account as verified
    const { modifiedCount, error } = await usersDL.updateUserWithVerified(user_id);

    // if there was an error
    if (error) {
        return response.status(500).json(utils.getResponseObj('internal error - could not verify account'));
    }

    if (modifiedCount === 0) {
        // if modifiedCount = 0, either no user was found or user has already been verified and added that key to the db
        const { user, error } = await usersDL.findUserByUserId(user_id);
        if (user === null) {
            return response.status(400).json(utils.getResponseObj('no user found'));
        }

        if (user) {
            return response.status(200).json(utils.getResponseObj('user has already been verified'));
        }

        if (error) {
            return response.status(500).json(utils.getResponseObj('internal error - could not verify account'));
        }
    }

    return response.status(200).json(utils.getResponseObj('successfully verified account'));
};

module.exports = (app) => {
    // /account/verify?user_id='123123'
    app.get('/account/verify', verifyAccountHandler);
};
