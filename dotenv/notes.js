'use strict';

const dotenv = require('dotenv');

/*
https://www.npmjs.com/package/dotenv
- validation options
  - https://joi.dev/api/?v=17.7.0#anyvalidatevalue-options
//--------------------------
- the location that dotenv.config() looks for a .env file is the process.cwd() which is the dir where the node process is executed from.

  - (see z-notes_general on process.cwd() vs __dirname differences)
  - so if you executed > node ../notes.js, process.cwd() is the dir you're in and not the directory where notes.js is in.
//--------------------------
- for a success case, dotenv.config() will return:

  EXAMPLE:
  const config = dotenv.config();
  // if .env is present in process.cwd(), then:
  config = {
    parsed: {
      DUMMY1: 'true'
    }
  }

  and to access the config values:

  config[DUMMY1];

//--------------------------
- dotenv.config() will RETURN an error if there is not a .env file in the process.cwd() location

  EXAMPLE:
  const config = dotenv.config();
  // if no .env is present in process.cwd(), then:
  config = {
    error: Error: ENOENT: no such file or directory, open '/Users/maxtam/Desktop/development/z-previous/learning/dotenv/file/.env'
        at Object.openSync (node:fs:594:3)
        at Object.readFileSync (node:fs:462:35)
        at Object.config (/Users/maxtam/Desktop/development/z-previous/learning/dotenv/node_modules/dotenv/lib/main.js:75:42)
        at Object.<anonymous> (/Users/maxtam/Desktop/development/z-previous/learning/dotenv/notes.js:15:23)
        at Module._compile (node:internal/modules/cjs/loader:1126:14)
        at Object.Module._extensions..js (node:internal/modules/cjs/loader:1180:10)
        at Module.load (node:internal/modules/cjs/loader:1004:32)
        at Function.Module._load (node:internal/modules/cjs/loader:839:12)
        at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
        at node:internal/main/run_main_module:17:47 {
      errno: -2,
      syscall: 'open',
      code: 'ENOENT',
      path: '/Users/maxtam/Desktop/development/z-previous/learning/dotenv/file/.env'
    }
  }

// ===========================
// RECOMMENDED USAGE
// ===========================
- use dotenv to load a SINGLE .env file and hardcode (specify) the path to ensure it is clear where it pulls from
*/
console.log('\n\n');
console.log('process.cwd() => ', process.cwd());
console.log('__dirname => ', __dirname);
console.log('\n\n');

// to load the .env file in the process.cwd()
// -----------------
// const config = dotenv.config();

// you can optionally pass in a specific path if you want to move away from process.cwd()
// -----------------
// const path = `${__dirname}/otherDir/.env`;
// const config = dotenv.config({ path });

// you can also run dotenv.config multiple times to load into the env, multiple .env files
// NOTE - however, the return value of dotenv.config() will only be { parsed: { ...current_env_file } }
// -----------------
let config = dotenv.config();
const path = `${__dirname}/otherDir/.env`;
config = dotenv.config({ path });

console.log('\n\n');
console.log('config => ', config);
console.log('\n\n');
console.log('\n\n');
console.log('env => ', process.env);
console.log('\n\n');

// To access the parsed values
// -----------------
const value1 = config.parsed.DUMMY1;
const value2 = config.parsed.OTHER_DIR_VALUES;
const value1FromEnv = process.env.DUMMY1;
const value2FromEnv = process.env.OTHER_DIR_VALUES;

console.log('\n\n');
console.log('value1 => ', value1);
console.log('value2 => ', value2);
console.log('value1FromEnv => ', value1FromEnv);
console.log('value2FromEnv => ', value2FromEnv);
console.log('\n\n');