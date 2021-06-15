'use strict';

const utils = require('../utils.js');
const usersDL = require('../datalayer/users.js');

const createAccountHandler = async (request, response) => {
    const { username, password } = request.body;

    console.log('\n');
    console.log('POST /account createAccountHandler => ', username, password);

    // validate that the username is an email
    if (!utils.isValidEmailAddressForm(username)) {
        console.log('\n');
        console.log('error during createAccountHandler => username must be an email');

        return response.status(400).json(utils.getResponseObj('username must be an email'));
    }

    // validate that the password is a string and more than 6 chars long
    if (typeof password !== 'string' || password.length < 6) {
        console.log('\n');
        console.log('error during createAccountHandler => password must be at least 6 chars long');

        return response.status(400).json(utils.getResponseObj('password must be at least 6 chars long'));
    }

    // validate that the username is not taken - this is needed because unless we specify the _id of any duplicate usernames, mongodb will just create a new entry upon creation
    const lookupResult = await usersDL.findUserByUsername(username);

    if (lookupResult.error) {
        return response.status(500).json(utils.getResponseObj('internal error - could not create account'));
    }

    // if another user exists with the same username
    if (lookupResult.user !== null) {
        return response.status(400).json(utils.getResponseObj('username already exists'));
    }

    // hash the password
    const passwordHash = await utils.hashPassword(password);

    // create an account
    const { user, error } = await usersDL.createUser(username, passwordHash);

    // if there was an error while creating the account
    if (error) {
        return response.status(500).json(utils.getResponseObj('internal error - could not create account'));
    }

    // send email asking user to verify their account which will set the verified flag in the user table for verification level secure actions
    // TODO

    return response.status(200).json(utils.getResponseObj('successfully created account'));
};

module.exports = (app) => {
    app.post('/account', createAccountHandler);
};
