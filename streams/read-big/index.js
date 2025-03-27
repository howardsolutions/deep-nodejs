const fs = require('node:fs/promises');

(async () => {
  const fileSrcHandler = await fs.open('src.txt', 'r');
  const fileWriteHandler = await fs.open('dest.txt', 'w');

  const readStream = fileSrcHandler.createReadStream({
    highWaterMark: 64 * 1024,
  });

  const writeStream = fileWriteHandler.createWriteStream();

  readStream.on('data', (chunk) => {
    const numbers = chunk.toString('utf-8').split('  ');

    const isCanWriteMore = writeStream.write(chunk);

    if (!isCanWriteMore) {
      readStream.pause();
    }
  });

  writeStream.on('drain', () => {
    readStream.resume();
  });
})();
