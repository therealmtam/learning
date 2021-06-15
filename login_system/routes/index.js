'use strict';

module.exports = (app) => {
    // register routes
    require('./healthCheck.js')(app);
    require('./secureInfo.js')(app);
    require('./createAccount.js')(app);
    require('./login.js')(app);
    require('./logout.js')(app);
    require('./verifyAccount.js')(app);
};
