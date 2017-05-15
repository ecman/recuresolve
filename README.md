# recuresolve

Creates an asynchronous recursive function that returns a Promise.

Intended for recursive functions that need to make asynchronous calls.

# Usage

```js
'use strict';
const recuresolve = require('recuresolve');

function asyncAdder(num1, num2, callback) {
  if (typeof(num1) !== 'number' ||
      typeof(num2) !== 'number') {
    let err = new TypeError('Parameters must be numbers');
    setTimeout(() => callback(err, 0), 1000);
    return;
  }

  let total = num1 + num2;
  setTimeout(() => callback(null, total), 1000);
}

const recursiveAsyncAdderCaller = recuresolve(
  (thisFn, resolve, reject, nums, index = 0, total = 0) => {

  if (index === nums.length) {
    console.log(`resolving total: ${total}`);
    resolve(total);
  } else {
    let num = nums[index];
    console.log(`Adding ${num} to total ${total}`);
    asyncAdder(num, total, (err, newTotal) => {
      if (err) {
        reject(err);
      } 
      else {
        thisFn(thisFn, resolve, reject, nums, index + 1, newTotal);
      }
    });
  }

});

let numbers = [1, 2, 3, 4, 5];
recursiveAsyncAdderCaller(numbers)
  .then((total) => console.log(`Total = ${total}`));
```

Output:

```text
adding 1 to running total 0
adding 2 to running total 1
adding 3 to running total 3
adding 4 to running total 6
adding 5 to running total 10
resolving total: 15
Total = 15
```      

Catch example:

```js
// following asyncAdder() and recursiveAsyncAdderCaller () 
// from above

let numbers = [1, 2, 3, 4, "5"];
recursiveAsyncAdderCaller(numbers)
  .then((total) => console.log(`Total = ${total}`))
  .catch((err) => console.log(`Error: ${err.message}`));
```

Catch output:

```text
Adding 1 to total 0
Adding 2 to total 1
Adding 3 to total 3
Adding 4 to total 6
Adding 5 to total 10
Error: Parameters must be numbers
```
