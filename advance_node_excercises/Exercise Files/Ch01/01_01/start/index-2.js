function delay(ms, callback) {
  setTimeout(callback, ms);
}

console.log('Starting delays');

delay(2000, () => {
  console.log('2 seconds pass');

  delay(1000, () => {
    console.log('1 second pass');
  });
});
