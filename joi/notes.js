'use strict';

/*
https://www.npmjs.com/package/joi
*/

const Joi = require('joi');

// ============================
// SCHEMA OBJECT VALIDATION
// ============================
const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeat_password: Joi.ref('password'),

    access_token: [
        Joi.string(),
        Joi.number()
    ],

    birth_year: Joi.number()
        .integer()
        .min(1900)
        .max(2013),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})
    .with('username', 'birth_year')
    .xor('password', 'access_token')
    .with('password', 'repeat_password');


const main = async () => {
  const util = require('util');
  try {
      /*
      value = {
        value: { username: 'abc', birth_year: 1994 },
        error: [Error [ValidationError]: "value" must contain at least one of [password, access_token]] {
          _original: { username: 'abc', birth_year: 1994 },
          details: [
            {
              message: '"value" must contain at least one of [password, access_token]',
              path: [],
              type: 'object.missing',
              context: {
                peers: [ 'password', 'access_token' ],
                peersWithLabels: [ 'password', 'access_token' ],
                label: 'value',
                value: { username: 'abc', birth_year: 1994 }
              }
            }
          ]
        }
      }
      */
      let value = schema.validate({ username: 'abc', birth_year: 1994 });
      // -> { value: { username: 'abc', birth_year: 1994 } }

      console.log('\n');
      console.log('---------------->');
      console.log('value =>');
      console.log(util.inspect(value, {showHidden: false, depth: null}));
      console.log('<----------------');
      console.log('\n');

      /*
      value = {
        value: {},
        error: [Error [ValidationError]: "username" is required] {
          _original: {},
          details: [
            {
              message: '"username" is required',
              path: [ 'username' ],
              type: 'any.required',
              context: { label: 'username', key: 'username' }
            }
          ]
        }
      }
      */
      value = schema.validate({});
      // -> { value: {}, error: '"username" is required' }

      console.log('\n');
      console.log('---------------->');
      console.log('value =>');
      console.log(util.inspect(value, {showHidden: false, depth: null}));
      console.log('<----------------');
      console.log('\n');


      /*
      value = {
        value: 'schemaB',
        error: [Error [ValidationError]: "value" must be one of [schemaA, schemaC]] {
          _original: 'schemaB',
          details: [
            {
              message: '"value" must be one of [schemaA, schemaC]',
              path: [],
              type: 'any.only',
              context: {
                valids: [ 'schemaA', 'schemaC' ],
                label: 'value',
                value: 'schemaB'
              }
            }
          ]
        }
      }
      */
      const schemaB = Joi.string().valid('schemaA', 'schemaC');
      value = schemaB.validate('schemaB');

      console.log('\n');
      console.log('---------------->');
      console.log('value =>');
      console.log(util.inspect(value, {showHidden: false, depth: null}));
      console.log('<----------------');
      console.log('\n');

      // Also -
      // NOTE - throws an error
      value = await schema.validateAsync({ username: 'abc', birth_year: 1994 });

      console.log('\n');
      console.log('---------------->');
      console.log('value =>');
      console.log(util.inspect(value, {showHidden: false, depth: null}));
      console.log('<----------------');
      console.log('\n');
  }
  catch (err) {
      /*
      err = [Error [ValidationError]: "value" must contain at least one of [password, access_token]] {
        _original: { username: 'abc', birth_year: 1994 },
        details: [
          {
            message: '"value" must contain at least one of [password, access_token]',
            path: [],
            type: 'object.missing',
            context: {
              peers: [ 'password', 'access_token' ],
              peersWithLabels: [ 'password', 'access_token' ],
              label: 'value',
              value: { username: 'abc', birth_year: 1994 }
            }
          }
        ]
      }
      */
      console.log('\n');
      console.log('---------------->');
      console.log('err =>');
      console.log(util.inspect(err, {showHidden: false, depth: null}));
      console.log('<----------------');
      console.log('\n');
  }
}

main();
