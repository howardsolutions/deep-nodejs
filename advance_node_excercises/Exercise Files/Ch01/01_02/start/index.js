// function delay(seconds, callback) {
//     setTimeout(callback, seconds*1000);
// }

// delay(1, () => {
//     console.log('one second');
// })

// console.log('end first tick');

function delay(ms) {
  return new Promise((resolve, reject) => {
    if (ms > 3000) {
      reject(new Error(`${ms} is too long!`));
    }
    setTimeout(resolve, ms);
  });
}

delay(1000)
  .then(() => console.log('1 sec passed'))
  .then(() => console.log('haha'));

delay(4000)
  .then(() => console.log('1 sec passed'))
  .catch((errMessage) => console.log(errMessage));
