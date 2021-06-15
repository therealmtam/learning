'use strict';

const utils = require('../utils.js');
const tokensDL = require('../datalayer/tokens.js');

const logoutHandler = async (request, response) => {

    console.log('\n');
    console.log('GET /logout logoutHandler => ', request.cookies);

    // expire the auth cookie (regardless of it is not present in the request)
    utils.setCookiesToResponse(response, [
        utils.expireAuthCookie()
    ]);

    // delete refresh token if any from tokens table
    const authToken = utils.getAuthCookieFromRequest(request);
    if (authToken) {
        const { deletedCount, error } = await tokensDL.deleteAuthToken(authToken);

        if (error || deletedCount === 0) {
            /*
            note - if error while deleting, it is ok, it could be
            - an unknown error actually occured
            - the auth token does not have a refresh token saved in the db
            */
            console.log('\n');
            console.log('error during logoutHandler - could not delete the auth token => ', error, deletedCount);
        }
    }

    return response.status(200).json(utils.getResponseObj('successful logout'));
};

module.exports = (app) => {
    app.get('/logout', logoutHandler);
};
