const convertEpochToTime = require('./convertEpochToTime');
const assert = require('assert');

//==================================
const areEqualObjs = (objA, objB) => {
  try {
    assert.deepEqual(objA, objB);
    return true;
  } catch (err) {
    console.log('\n');
    console.log('--------->');
    console.log('err => ', err);
    console.log('<---------');
    console.log('\n');
    return false;
  }
};
//==================================
const sortObjectKeys = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  const sortedKeys = Object.keys(obj).sort((a, b) => {
    // Compare keys by lowercase representation
    const keyA = a.toLowerCase();
    const keyB = b.toLowerCase();

    // If lowercase keys are the same, compare the original keys
    if (keyA === keyB) {
      return a.localeCompare(b);
    }

    return keyA.localeCompare(keyB);
  });

  const sortedObject = {};

  sortedKeys.forEach((key) => {
    sortedObject[key] = obj[key];
  });

  return sortedObject;
};

// Example usage:
// const unsortedObject = {
//   zebra: 1,
//   Apple: 2,
//   Banana: 3,
//   Cat: 10,
//   Dog: 4,
//   cat: 5,
//   apple: 12,
// };

// const sortedObject = sortObjectKeys(unsortedObject);
// console.log(sortedObject);

//==================================

function isObject(obj) {
  // restrict to arrays and plain objects
  return (
    typeof obj === 'object' &&
    obj !== null &&
    // and not specific types of objects difficult to assert deep eval
    !(obj instanceof Date)
  );
}

const areDifferingValues = (anyA, anyB) => {
  if (typeof anyA !== typeof anyB) {
    return true;
  }

  if (anyA instanceof Object) {
    if (Array.isArray(anyA)) {
      return !areEqualObjs(anyA, anyB);
    }

    if (anyA instanceof Date && anyB instanceof Date) {
      return anyA.toISOString() !== anyB.toISOString();
    }

    return !areEqualObjs(anyA, anyB);
  }
  if (isObject(anyA)) {
    return !areEqualObjs(anyA, anyB);
  }

  // for strings and numbers or null or undefined mainly
  if (anyA !== anyB) {
    return true;
  }

  return false;
};

const getDifferingKeysOfObj = (objToFindDiff, objToCompareTo) => {
  const differingKeys = {};

  // compare all top level keys in main obj to see if they exist and if exists, differ
  for (const key in objToFindDiff) {
    if (
      !objToCompareTo[key] ||
      areDifferingValues(objToFindDiff[key], objToCompareTo[key])
    ) {
      // if the key is a time key
      if (key.includes('time')) {
        differingKeys[key] = {
          original: objToFindDiff[key],
          ...convertEpochToTime(objToFindDiff[key]),
        };
      } else {
        // return key value as is
        differingKeys[key] = objToFindDiff[key];
      }
    }
  }

  // compare all the top level keys in other obj to see if they exist in other obj
  for (const key in objToCompareTo) {
    if (!objToFindDiff[key]) {
      // If the key doesn't exist in main, add it to differingKeys
      differingKeys[key] = 'missing this key';
    }
  }

  return differingKeys;
};

const findDifferingKeysOfTwoObjs = (obj1, obj2) => {
  return {
    1: sortObjectKeys(getDifferingKeysOfObj(obj1, obj2)),
    2: sortObjectKeys(getDifferingKeysOfObj(obj2, obj1)),
  };
};

// Example usage:
// const obj1 = {
//   key1: 'value1',
//   key2: 10,
//   key3: true,
//   key5: null,
// };
//
// const obj2 = {
//   key1: 11,
//   key2: 10,
//   key4: 'value4',
//   key6: null,
//   key7: { a: 10, b: 11 },
// };
//
// const differingKeys = findDifferingKeysOfTwoObjs(obj1, obj2);
// console.log(differingKeys);
//==================================

module.exports = findDifferingKeysOfTwoObjs;
