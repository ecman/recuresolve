'use strict';
module.exports = recuresolve;

/**
 * Generates a recursive function that returns a Promise
 *
 * @param deepfn {function) a recursive function
 * @param ...declareArgs {any} parameters for deepfn
 * 
 * deepfn should have a signature that
 * accepts at leasst 3 parameters:
 *
 *  recurser {function} a reference to the recursive function
 *  resolve {function} the Promise resolve function
 *  reject {function} the promise reject function
 * 
 * Additional declare-time parameters are 
 * passed in via ...declareArgs
 *
 * @Returns {function} accepting ...userArgs as parameters
 */
function recuresolve(recurser, ...declareArgs) {
  return function (...userArgs) {
    let resolvefn;
    let rejectfn;
    let  promise = new Promise((resolve, reject) => {
      resolvefn = (val) => resolve(val)
      rejectfn = (val) => reject(val)
    });
    recurser(recurser, resolvefn, rejectfn, ...declareArgs, ...userArgs);
    return promise;
  }
}
