'use strict';

/*
CONCURRENCY:
-------------
- bluebird's Promise.map([...list], async () => { ...logic }, { concurrency: # }) is the easist way to control concurrency.
  - BUT Bluebird does NOT return the results in sequence of promise return

- the regular for loop only allows for SINGLE concurrency

- _.forEach and regular js [].forEach will run ALL promises concurrently
*/

const _ = require('lodash');
const bbPromise = require('bluebird');
let count = 1;

const x = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('resolving')
    resolve(count)
  }, 1000);
});

const main = async() => {
  // case for js forEach = ALL concurrency
  // ------------------

  // [1,2,3,4,5].forEach(async (v) => {
  //   await x()
  //   console.log('count returned = ', count)
  //   count++
  // })

  // case for lodash forEach = ALL concurrency
  // ------------------

  // _.forEach([1,2,3,4,5], async () => {
  //   await x()
  //   console.log('count returned = ', count)
  //   count++
  // })

  // case for js for = SINGLE concurrency
  // ------------------

  // for (let i = 0; i < 5; i++) {
  //   await x()
  //   console.log('count returned = ', count)
  //   count++
  // }

  // case for bluebird concurrency control
  // ------------------

  // NOTE - THE RESULTS are NOT in sequence of return when using BLUE BIRD => [ 1, 5, 4, 3, 2 ] should be [1,2,3,4,5]
  const result = await bbPromise.map([1,2,3,4,5], async () => {
    let res = await x()
    console.log('count returned = ', res)
    count++
    return res;
  }, { concurrency: 1 })

  console.log('\n\n');
  console.log('result => ', result);
  console.log('\n\n');
};

main();