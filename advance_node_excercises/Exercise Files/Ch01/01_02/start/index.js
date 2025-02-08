// function delay(seconds, callback) {
//     setTimeout(callback, seconds*1000);
// }

// delay(1, () => {
//     console.log('one second');
// })

// console.log('end first tick');

function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

delay(1000)
  .then(() => console.log('1 sec passed'))
  .then(() => console.log('haha'));
