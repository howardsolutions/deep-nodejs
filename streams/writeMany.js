const fs = require('node:fs/promises');

// (async () => {
//   const fileHandler = await fs.open('text.txt', 'w');

//   for (let i = 0; i < 100; i++) {
//     await fileHandler.write(` ${i} `);
//   }
// })();

(async () => { 
  console.time('writeMany');
  const fileHandler = await fs.open('text.txt', 'w');

  const stream = fileHandler.createWriteStream();

  for (let i = 0; i < 1000; i++) {
    const buff = Buffer.from(` ${i} `, 'utf-8');
    stream.write(buff);
  }

  console.timeEnd('writeMany');
})();
