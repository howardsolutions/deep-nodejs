const { read } = require('node:fs');
const fs = require('node:fs/promises');
const { pipeline } = require('node:stream');

(async () => {
  console.time('Pipe');

  const sourceFileContent = await fs.open('text-big.txt');
  const destinationFile = await fs.open('text-copy.txt', 'w');

  const readStream = sourceFileContent.createReadStream();
  const writeStream = destinationFile.createWriteStream();

  //   readStream.pipe(writeStream);

  //   readStream.on('end', () => {
  //     console.timeEnd('Pipe end');
  //   });

  pipeline(readStream, writeStream, (err) => {
    if (err) console.log(err);

    console.timeEnd('Piping end');
  });
})();
