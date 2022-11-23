'use strict';

const dotenv = require('dotenv');
const Joi = require('joi');

// ------------------
// Validation Functions
// ------------------
const schemaOfConfig = Joi.object({
  mysql: Joi.object({
    MYSQL_HOST: Joi.string(),
    MYSQL_USER: Joi.string().valid('root'),
    MYSQL_PORT: Joi.number().valid(3306),
    MYSQL_DATABASE: Joi.string().valid('styl_v3_dev'),
    MYSQL_PASSWORD: Joi.string(),
  })
});

const validateHost = (host) => {
  const schema = Joi.string();
  const { error, value } = schema.validate(host);
  if (error) {
    throw error;
  }
  return value;
};

const validateUser = (user) => {
  const schema = Joi.string().valid('root');
  const { error, value } = schema.validate(user);
  if (error) {
    throw error;
  }
  return value;
};

const validatePort = (port) => {
  const schema = Joi.number().valid(3306);
  const { error, value } = schema.validate(port);
  if (error) {
    throw error;
  }
  return value;
};

const validateDatabase = (dbName) => {
  const schema = Joi.string().valid('styl_v3_dev');
  const { error, value } = schema.validate(dbName);
  if (error) {
    throw error;
  }
  return value;
};

const validatePassword = (pwd) => {
  const schema = Joi.string();
  const { error, value } = schema.validate(pwd);
  if (error) {
    throw error;
  }
  return value;
};

const validateEnv = (env) => {
  const schema = Joi.string().valid('dev', 'stage', 'prod');
  const { error, value } = schema.validate(env);
  if (error) {
    throw error;
  }
  return value;
};

// ------------------
// INJECT NODE_ENV FROM SOMEWHERE
process.env.NODE_ENV = process.env.NODE_ENV ||'dev';

const serverEnv = process.env.NODE_ENV;
// validate the env
validateEnv(serverEnv);

// ------------------
// auto load the .env env vars on first import of this module
const path = `${__dirname}/.env-${serverEnv}`;
const dotenvConfig = dotenv.config({ path });

if (dotenvConfig.error) {
  /*
  error.message = ENOENT: no such file or directory, open '/Users/maxtam/Desktop/development/z-previous/learning/dotenv/.env'
  */
  console.log(dotenvConfig.error.message)
  throw dotenvConfig.error
}

// put the values into proper structure
const config = {
  mysql: {
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PORT: Number(process.env.MYSQL_PORT),
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD
  }
};

// validate the config
const validationResult = schemaOfConfig.validate(config, { abortEarly: false });  // evaluate all fields
if (validationResult.error) {
  console.log(validationResult.error.message);
  throw validationResult.error;
}

/*
NOTE:
- NODE_ENV=dev has proper env vars to test
- NODE_ENV=stage and prod do not
*/

console.log('\n\n');
console.log('final config to use => ', config);
console.log('\n\n');

module.exports = config;