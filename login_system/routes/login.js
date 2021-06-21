'use strict';

const utils = require('../utils.js');
const usersDL = require('../datalayer/users.js');
const tokensDL = require('../datalayer/tokens.js');

const loginHandler = async (request, response) => {
    const { username, password, rememberMe } = request.body;

    console.log('\n');
    console.log('POST /login loginHandler => ', request.body);

    // validate that the username is an email
    if (!utils.isValidEmailAddressForm(username)) {
        console.log('\n');
        console.log('error during loginHandler => username must be an email');

        return response.status(400).json(utils.getResponseObj('username must be an email'));
    }

    // validate that the password is a string and more than 6 chars long
    if (typeof password !== 'string' || password.length < 6) {
        console.log('\n');
        console.log('error during loginHandler => password must be at least 6 chars long');

        return response.status(400).json(utils.getResponseObj('password must be at least 6 chars long'));
    }

    // authenticate user using the username and password
    // -------------------------
    const lookupResult = await usersDL.findUserByUsername(username);

    if (lookupResult.error) {
        return response.status(500).json(utils.getResponseObj('internal error - error trying to find user'));
    }

    if (lookupResult.user === null) {
        return response.status(400).json(utils.getResponseObj('could not find user'));
    }

    // compare the provided password to the password in the db
    const passwordsMatch = await utils.compareHashToPlainTextPwd(password, lookupResult.user.password);

    if (!passwordsMatch) {
        return response.status(401).json(utils.getResponseObj('incorrect password'));
    }

    // authorize user by generating auth token and returning it to the user
    // -------------------------

    // use the user's id to generate the auth token
    const userObjUsedToGenerateAuthToken = utils.getUserObjUsedToGenerateAuthToken(lookupResult.user._id);

    const refreshToken = utils.generateRefreshToken(userObjUsedToGenerateAuthToken);

    const authToken = utils.generateAuthTokenUsingAccessToken(userObjUsedToGenerateAuthToken);

    // store the auth token and refresh token if user selects rememberMe
    if (rememberMe === true) {
        const { tokens, error } = await tokensDL.storeTokens(authToken, refreshToken);

        // if unable to store tokens, not a problem - user will just have to re-login
    }

    // set the auth token as a cookie
    utils.setCookiesToResponse(response, [
        utils.generateNewAuthCookie(authToken)
    ]);

    return response.status(200).json(utils.getResponseObj('successful login'));
};

module.exports = (app) => {
    app.post('/login', loginHandler);
};
