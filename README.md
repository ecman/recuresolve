# recuresolve

Creates an asynchronous recursive function that returns a Promise.

Intended for recursive functions that need to make asynchronous calls.

# Usage

```js
'use strict';
const recuresolve = require('recuresolve');

function asyncAdder(num1, num2, callback) {
  let total = num1 + num2;
  setTimeout(() => callback(total), 1000);
}

const recursiveAsyncAdderCaller = recuresolve(
  (thisFn, resolve, reject, nums, index = 0, total = 0) => {

  if (index === nums.length) {
    console.log(`resolving total: ${total}`);
    resolve(total);
  } else {
    let num = nums[index];
    console.log(`adding ${num} to running total ${total}`);
    asyncAdder(num, total, (newTotal) => {
      thisFn(thisFn, resolve, reject, nums, index + 1, newTotal);
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
