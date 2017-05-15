'use strict';
module.exports = recuresolve;

/**
 * Generates a recursive function that returns a Promise
 *
 * @param deepfn {function) a recursive function
 * @param ...args {any} parameters for deepfn (optional)
 * 
 * deepfn should have a signature that
 * accepts at leasst 3 parameters:
 *
 *  recurser {function} a reference to the recursive function
 *  resolve {function} the Promise resolve function
 *  reject {function} the promise reject function
 * 
 * Additional parameters are those passed in via ...args 
 *
 * @Returns {function} accepting ...args as parameters
 */
function recuresolve(recurser, ...args) {
  let resolvefn;
  let rejectfn;
  let promise;
  let init = () => {
    promise = new Promise((resolve, reject) => {
      resolvefn = (val) => { resolve(val); init(); }
      rejectfn = (val) => { reject(val); init(); }
    });
  };

  init();
  
  return function (...args) {
    recurser(recurser, resolvefn, rejectfn, ...args); 
    return promise;
  }
}
