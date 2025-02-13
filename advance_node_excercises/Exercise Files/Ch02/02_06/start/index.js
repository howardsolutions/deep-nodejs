const { createReadStream, createWriteStream } = require('fs');

// const readStream = createReadStream('../../powder-day.mp4');
const writeStream = createWriteStream('./file.txt');

// readStream.pipe(writeStream).on('error', console.error);

process.stdin.pipe(writeStream);

// .pipe method - allow us to Pipe data from any readable stream to any writable stream
