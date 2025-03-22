const fs = require('node:fs/promises');

(async () => {
  console.time('writeMany');
  const fileHandler = await fs.open('text.txt', 'w');

  const stream = fileHandler.createWriteStream();

  let i = 0;

  function writeMany() {
    while (i < 10000) {
      const buffer = Buffer.from(` ${i} `, 'utf-8');

      if (i === 9999) stream.end(buffer);

      if (stream.write(buffer) === false) {
        i++;
        break;
      }

      i++;
    }
  }

  stream.on('drain', () => {
    writeMany();
  });

  stream.on('end', () => {
    console.timeEnd('writeMany');
    fileHandler.close();
  });
})();
