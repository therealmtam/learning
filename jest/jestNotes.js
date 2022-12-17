/*
- basic tutorial setup if no config file for jest (jest.config.js)
  - https://jestjs.io/docs/getting-started

  - all you need is a file that meets this criteria in naming:
    - testMatch: */__tests__/* /*.[jt]s?(x), * * /?(*.)+(spec|test).[tj]s?(x)

    - so file name neests to be XX.test.ts/js or XX.spec.ts/js

    - the contents of the file can be as simple as:

      function sum(a, b) {
        return a + b;
      }
      module.exports = sum;

      // const sum = require('./sum');

      test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
      });

  - then add a script as
    "test": "jest"

  - then jest will use its out of the box config to find those files and tests and run


-----------
- more advanced setup with a jest.config file to control the config of the tests


initial setup
---------------
- https://jestjs.io/docs/getting-started#running-from-command-line

- first you add jest globally to your npm packages
  > npm install jest --global

- then you can use the comamand
  > jest --init

    - there is [jest.config__tsversion.ts] which is the output after you run it and say you want a ts version of the config and running the app for node

    - there is [jest.config.js] which is the output after you run it and say you want a js version of the config running the tests in v8 (node)

      - this is the one the [advanced] tests will use since using the ts version of the config requires additional packages

        - TODO - a tutorial on what additional packages are needed for ts to work
          - Note: that if the test files are in ts and use ts stuff like import or types, you need to do additional stuff for that as well. BUT if the test file is just named as ts but does not contain ts related terms, then you can run it with js config without any issues

          - https://jestjs.io/docs/getting-started#using-typescript


- after the config file is built, (not the TS version of the config which requires more research ^), you can just do the same as the basic config and run

  > yarn test

--------
TYPESCRIPT test running (not config file with ts)

- to have test files that are ts driven using ts-jest

  - NOTE there are other ts ways to do this but we just cover ts-jest

    - https://jestjs.io/docs/getting-started#using-typescript

- so run > jest --init and output a js config file

- then you need to install ts-jest

  - run > npm install --save-dev ts-jest

  - https://jestjs.io/docs/getting-started#via-ts-jest

  - https://kulshekhar.github.io/ts-jest/docs/getting-started/installation/#jest-config-file

  - then run >npx ts-jest config:init which will write a bare bones config just for jest to be able to run ts files using ts-jest

      - https://jestjs.io/docs/getting-started#via-ts-jest

  - then you run > npm i --save-dev @types/jest to install the package needed for the describe/test/expect to be available for ts-jest to work

  - now you can run > yarn run test and the ts spec files will work

*/