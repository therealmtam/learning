'use strict';

const utils = require('../utils.js');

const secureInfoHandler = async (request, response) => {
    const existingAuthToken = utils.getAuthCookieFromRequest(request);

    console.log('\n');
    console.log('GET /secure_info secureInfoHandler => ', request.cookies);

    const { auth_token, user_id } = await utils.checkAuthorizationAndRefreshTokenIfNeeded(existingAuthToken);

    if (auth_token === null) {
        // if auth token is invalid and could not be refreshed
        return response.status(401).json(utils.getResponseObj('unauthorized'));
    }

    if (user_id === null) {
        // if some how the code returned a null user_id
        return response.status(500).json(utils.getResponseObj('internal error - user not found'));
    }

    if (existingAuthToken !== auth_token) {
        // if the auth token is a newly refreshed one set it as a cookie
        utils.setCookiesToResponse(response, [
            utils.generateNewAuthCookie(auth_token)
        ]);
    }


    return response.status(200).json(utils.getResponseObj('got secure info'));
};

module.exports = (app) => {
    app.get('/secure_info', secureInfoHandler);
};
