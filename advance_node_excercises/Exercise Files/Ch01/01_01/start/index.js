// function hideString(str) {
//     return str.replace(/[a-zA-Z]/g, 'X');
// }

// var hidden = hideString("Hello World");

// console.log( hidden );

//////////////////////////////// FIRST CHANGE //./////////////////////
// CPS version - Continuation passing style

// function hideString(str, done) {
//   done(str.replace(/[a-zA-Z]/g, 'X'));
// }

// hideString('Hello World', (hidden) => {
//   console.log(hidden);
// });

// console.log("end");
// RESULT: XXXX, end

//////////////////////////////// SECOND CHANGE //./////////////////////
// process.nextTick() - invoke the function inside next tick on the next loop
// callback require some asynchronousity

function hideString(str, done) {
  process.nextTick(() => {
    done(str.replace(/[a-zA-Z]/g, 'X'));
  });
}

hideString('Hello World', (hidden) => {
  console.log(hidden);
});

console.log('end');

// RESULT: end, XXXXXX
