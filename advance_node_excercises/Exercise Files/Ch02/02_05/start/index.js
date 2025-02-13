const { createReadStream, createWriteStream } = require('fs');

const readStream = createReadStream('../../powder-day.mp4');

const writeStream = createWriteStream('./copy.mp4', {
  highWaterMark: 1628920,
});

readStream.on('data', (chunk) => {
  const isCanHandleMoreData = writeStream.write(chunk);

  if (!isCanHandleMoreData) {
    console.log('Has backpressure');
    readStream.pause();
  }
});

readStream.on('error', (error) => {
  console.log('an error occurred', error.message);
});

readStream.on('end', () => {
  writeStream.end();
});

writeStream.on('close', () => {
  process.stdout.write('file copied\n');
});

// to know when we could start pouring data in again. when writeStream drain.
writeStream.on('drain', () => {
  console.log('DRAIN');
  readStream.resume();
});
