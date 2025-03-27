const fs = require('node:fs/promises');

// // FIRST APPROACH to copy a file
// (async () => {
//   const sourceFileContent = await fs.readFile('text.txt');
//   const destinationFile = await fs.open('text-copy.txt', 'w');

//   await destinationFile.write(sourceFileContent);

//   console.log(sourceFileContent);
// })();


// _____________________________
// 2nd approach USING Stream without NodeJS stream
(async () => {
  console.time('Copy');

  const sourceFileContent = await fs.open('text-big.txt');
  const destinationFile = await fs.open('text-copy.txt', 'w');

  let bytesRead = -1; // when we start, we have nothing to read, when we finished reading from a file, bytesRead = 0

  while (bytesRead !== 0) {
    const readResult = await sourceFileContent.read();
    bytesRead = readResult.bytesRead;

    // In case we have 0s in our readResult buffer, we need to create new buffer with right size, remove these 0s.
    // then write to the desitination file - to avoid NULL value
    if (bytesRead !== 16384) {
      // Idx of the first 0 that happens in our buffer
      const indexOfFirstNotFilledPosition = readResult.buffer.indexOf(0);
      // Create a new Buffer with the right size for all meaningful values, and dimish all other 0s
      const newBuffer = Buffer.alloc(indexOfFirstNotFilledPosition);
      // Copy from the 0 idx of the current readResult buffer, all the way to the indexOfFirstNotFilledPosition
      readResult.buffer.copy(newBuffer, 0, 0, indexOfFirstNotFilledPosition);
      // write to the file
      destinationFile.write(newBuffer);
    } else {
      // else we just write as normal

      // WRITE TO THE FILE
      destinationFile.write(readResult.buffer);
    }
  }

  console.timeEnd('Copy');
})();
