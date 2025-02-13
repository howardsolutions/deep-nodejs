const fs = require('fs');

const readStream = fs.createReadStream('../../powder-day.mp4');

readStream.on('data', (chunk) => {
  console.log('reading little chunk\n', chunk);
});

readStream.on('end', () => console.log('done'));

readStream.on('error', (error) => console.log('Error has occured', error));

// pause from flowing mode.
readStream.pause();

process.stdin.on('data', (chunk) => {
  const text = chunk.toString().trim();

  if (text == 'finish') {
    // continue go back to the normal flowing mode
    readStream.resume();
  }

  readStream.read();
});
