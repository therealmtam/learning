'use strict';

const healthCheckHandler = async (request, response) => {
    return response.status(200).send('OK');
};

module.exports = (app) => {
    app.get('/healthcheck', healthCheckHandler);
};
