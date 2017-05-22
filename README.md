# recuresolve

[![build status](https://api.travis-ci.org/ecman/recuresolve.png)](https://travis-ci.org/ecman/recuresolve) [![codecov](https://codecov.io/gh/ecman/recuresolve/branch/master/graph/badge.svg)](https://codecov.io/gh/ecman/recuresolve) [![Code Climate](https://codeclimate.com/github/ecman/recuresolve/badges/gpa.svg)](https://codeclimate.com/github/ecman/recuresolve)

# DEPRECATED 

Provided functionality possible by this pattern:

```js
function myRecurser(arg) {
  return new Promise((resolve, reject) => {
    asyncCallback(arg, (result) => {
      if (result) resolve(result);
      else {
        let newArg;
        // Do stuff with newArg
        resolve(myRecursor(newArg));
      }
    });
  });
}
```
