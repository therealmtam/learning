'use strict';

const emailValidator = require("email-validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokensDL = require('./datalayer/tokens.js');
const _ = require('lodash');

const isValidEmailAddressForm = (emailAddress) => emailValidator.validate(emailAddress); // returns true or false;

const getResponseObj = (message, data = {}) => ({
    message,
    data
});

const getUserObjUsedToGenerateAuthToken = (userId) => ({ user_id: userId });

const checkAuthorizationAndRefreshTokenIfNeeded = async (authToken) => {
    // validate the auth token using the access-token-secret
    const dataToReturn = {
        auth_token: null,
        user_id: null
    };

    try {
        // decrypt auth token if it is valid and get the user_id
        const { user_id } = jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET);

        // set data to return
        dataToReturn.auth_token = authToken; // existing authToken is still valid
        dataToReturn.user_id = user_id;
    } catch (error) {
        console.log('\n');
        console.log('error during checkUserAuthorization => ', error.message);

        // if token is expired, try and get a new auth token using a refresh token if it exists
        if (error.message === 'jwt expired') {
            const { auth_token, user_id } = await _getNewAuthTokenAndUserInfoUsingRefreshTokenIfAny(authToken);

            // set data to return
            dataToReturn.auth_token = auth_token;
            dataToReturn.user_id = user_id;
        }
    }

    return dataToReturn;
};

const _getRefreshTokenIfAny = async (authToken) => {
    const { tokens, error } = await tokensDL.findTokensByAuthToken(authToken);

    return tokens ? tokens.refresh_token : null;
};

const _getNewAuthTokenAndUserInfoUsingRefreshTokenIfAny = async (expiredAuthToken) => {
    const dataToReturn = {
        auth_token: null,
        user_id: null
    }

    try {
        // get refresh token from db if any
        const refreshToken = await _getRefreshTokenIfAny(expiredAuthToken);

        if (!refreshToken) {
            throw Error('no refresh token found');
        }

        // decrypt the refresh token to get the user_id
        const { user_id } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET); // infoToHash = { user_id: '123123123', iat: 1623555038 }

        // generate the new auth token
        const newAuthToken = generateAuthTokenUsingAccessToken(getUserObjUsedToGenerateAuthToken(user_id));

        // store the new auth token for the refresh token
        const { modifiedCount, error } = await tokensDL.updateAuthToken(newAuthToken, refreshToken);

        if (error || modifiedCount === 0) {
            // note - it is ok if we were not able to store the refresh token because user just will not be able to refresh next time their token expires and will just need to login
            console.log('\n');
            console.log('error during _getNewAuthTokenAndUserInfoUsingRefreshTokenIfAny - could not save the new auth token => ', error, modifiedCount);
        }

        // set the new auth token and userId
        dataToReturn.auth_token = newAuthToken
        dataToReturn.user_id = user_id;
    } catch (error) {
        console.log('\n');
        console.log('error during generateAuthTokenUsingRefreshTokenIfAny => ', error.message);
    }

    return dataToReturn;
};

const generateAuthTokenUsingAccessToken = (infoToHash, expInSec) => {
    // default is 15 minutes = 900s
    const expirationToUse = expInSec || process.env.AUTH_TOKEN_EXPIRATION_IN_SEC || '900s';

    /*
    return = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlcm5hbWUiLCJpYXQiOjE2MjM1MzUwMjJ9.7Hh7IaIjMlFcGB9V6GOvQ16VixI0jNmFCEFiWocCsVM'
    */
   return jwt.sign(infoToHash, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expirationToUse });
};

const generateRefreshToken = (infoToHash) => {
    /*
    return = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlcm5hbWUiLCJpYXQiOjE2MjM1MzUwMjJ9.7Hh7IaIjMlFcGB9V6GOvQ16VixI0jNmFCEFiWocCsVM'
    */
    return jwt.sign(infoToHash, process.env.REFRESH_TOKEN_SECRET);
};

const hashPassword = async (plainTextPwd) => {
    const saltRoundsToUse = process.env.SALT_ROUNDS ? Number(process.env.SALT_ROUNDS) : 10;

    // hash = $2b$10$JXQF2Eaadqi9X3Qpf0cdDeoBGkOjGtSiQA20qYQSmvWp6pYzm4lM2
    return await bcrypt.hash(plainTextPwd, saltRoundsToUse);
};

const compareHashToPlainTextPwd = async (plainTextPwd, passwordHash) => {
    // true || false
    return await bcrypt.compare(plainTextPwd, passwordHash);
};

const setCookiesToResponse = (response, listOfCookieObjs = []) => {
    /*
    - search for res.cookie on http://expressjs.com/en/api.html
    - res.cookie sets cookie name to value. The value parameter may be a string or object converted to JSON.

    listOfCookieObjs = [ {
        name: cookieName,
        value: cookieValueAsAString,
        options: {
            domain,
            encode,
            expires,
            httpOnly,
            maxAge,
            path,
            secure,
            signed,
            sameSite
    } ]
    */

    _.forEach(listOfCookieObjs, ({ name, value, options }) => {
        // set defaults
        value = value || '';
        options = options || {};

        // set the cookie on the response
        response.cookie(name, value, options);
    });

    return response;
};

const generateCookieExpireDate = function(timeFromNowToExpire = 0, asUTCString = false) {
    const dateToExpire = new Date();
    if (timeFromNowToExpire < 0) {
        // set the expire date to 'Thu, 01 Jan 1970 00:00:00 GMT'
        dateToExpire.setTime(dateToExpire.getDate());
    } else {
        // set the expire date to a time in the future (timeFromNowToExpire is in ms)
        dateToExpire.setTime(Date.now() + timeFromNowToExpire);
    }

    if (asUTCString === true) {
        // ex. returns 'Thu, 01 Jan 1970 00:00:00 GMT'
        return dateToExpire.toUTCString();
    }

    // ex. returns a Date object that consoles to => 2021-06-15T07:27:21.167Z
    return dateToExpire;
};

const getTimeInMilliseconds = function(days = 0, hours = 0, mins = 0) {
    const msFromDays = days * 24 * 60 * 60 * 1000;
    const msFromhHours = hours * 60 * 60 * 1000;
    const msFromMins = mins * 60 * 1000;
    return msFromDays + msFromhHours + msFromMins;
};

const generateSetCookieHeaderString = function(cookieName, cookieVal, cookieOptions) {
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
    /*
    cookieName = 'WM_SEC.AUTH_TOKEN'
    cookieVal = '12345'
    cookieOptions = {
        encode,
        signed,
        domain: 'asda.com',
        expires: timeFromNowToExpire in ms,
        httpOnly: true,
        maxAge: maxAgeInSeconds,
        path: '/api/someendpoint',
        secure: true,
        sameSite: 'Strict' | 'None' | 'Lax'
    }
    */
    let baseSetCookieHeaderVal = `${cookieName}=${cookieVal}`;

    if (_.has(cookieOptions, 'expires')) {
        // 'Expires=Thu, 01 Jan 1970 00:00:00 GMT';
        baseSetCookieHeaderVal += `;Expires=${generateCookieExpireDate(_.get(cookieOptions, 'expires'), true)}`;
    }

    if (_.has(cookieOptions, 'maxAge')) {
        // 'Max-Age=<max age in seconds>'
        baseSetCookieHeaderVal += `;Max-Age=${_.get(cookieOptions, 'maxAge')}`;
    }

    if (_.has(cookieOptions, 'domain')) {
        // 'Domain=asda.com'
        baseSetCookieHeaderVal += `;Domain=${_.get(cookieOptions, 'domain')}`;
    }

    if (_.has(cookieOptions, 'path')) {
        // 'Path=/'
        baseSetCookieHeaderVal += `;Path=${_.get(cookieOptions, 'path')}`;
    }

    if (_.has(cookieOptions, 'secure')) {
        // 'Secure'
        baseSetCookieHeaderVal += `;Secure`;
    }

    if (_.has(cookieOptions, 'httpOnly')) {
        // 'HttpOnly'
        baseSetCookieHeaderVal += `;HttpOnly`;
    }

    if (_.has(cookieOptions, 'sameSite')) {
        // 'SameSite='Strict'
        baseSetCookieHeaderVal += `;SameSite=${_.get(cookieOptions, 'sameSite')}`;
    }

    /*
    return baseSetCookieHeaderVal = 'WM_SEC.AUTH_TOKEN=12345; Max-Age=0; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Domain=asda.com; Path=/; Secure; HttpOnly'
    */
    return baseSetCookieHeaderVal;
};

const generateNewAuthCookie = (authToken) => {
    let expires = process.env.AUTH_TOKEN_EXPIRE_TIME_FROM_NOW;
    if (process.env.AUTH_TOKEN_EXPIRE_TIME_FROM_NOW) {
        //AUTH_TOKEN_EXPIRE_TIME_FROM_NOW=0|0|30 <= days|hours|mins
        const daysHoursMins = expires.split('|');
        const timeFromNowInMs = getTimeInMilliseconds(Number(daysHoursMins[0]), Number(daysHoursMins[1]), Number(daysHoursMins[2]));
        expires = generateCookieExpireDate(timeFromNowInMs);
    } else {
        // default = token expires 30 mins from now
        expires = generateCookieExpireDate(getTimeInMilliseconds(0, 0, 30));
    }

    // send this cookie only on https calls in production
    const secure = process.env.NODE_ENV === 'production' ? true : false;

    return {
        name: 'auth',
        value: authToken,
        options: {
            // send this cookie in all requests by front-end
            path: '/',
            secure,
            expires
        }
    }
};

const expireAuthCookie = () => ({
    name: 'auth',
    value: '',
    options: {
        path: '/',
        expires: generateCookieExpireDate(-1)
    }
});

const getAuthCookieFromRequest = (request) => {
    // https://www.npmjs.com/package/cookie-parser
    return request.cookies.auth;
};


module.exports = {
    getResponseObj,
    isValidEmailAddressForm,
    getUserObjUsedToGenerateAuthToken,
    generateAuthTokenUsingAccessToken,
    generateRefreshToken,
    checkAuthorizationAndRefreshTokenIfNeeded,
    hashPassword,
    compareHashToPlainTextPwd,

    setCookiesToResponse,
    generateSetCookieHeaderString,
    getTimeInMilliseconds,
    generateCookieExpireDate,
    generateNewAuthCookie,
    getAuthCookieFromRequest,
    expireAuthCookie
}
