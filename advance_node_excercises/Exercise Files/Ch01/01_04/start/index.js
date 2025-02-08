// var { promisify } = require('util');

function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      function customCallback(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      fn.call(this, ...args, customCallback);
    });
  };
}

var delay = (seconds, callback) => {
  if (seconds > 3) {
    callback(new Error(`${seconds} seconds it too long!`));
  } else {
    setTimeout(
      () => callback(null, `the ${seconds} second delay is over.`),
      seconds
    );
  }
};

// delay(2, (error, message) => {
//   if (error) {
//     console.log(error.message);
//   } else {
//     console.log(message);
//   }
// });

const promiseDelay = promisify(delay);

promiseDelay(2).then(console.log).catch(console.error);
