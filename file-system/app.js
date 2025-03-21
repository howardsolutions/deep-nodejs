const fs = require('fs/promises');

(async () => {
  // OPEN the file
  const commandFileHandler = await fs.open('./command.txt', 'r');

  const watcher = fs.watch('./command.txt');

  for await (const event of watcher) {
    // File Changed! READ file content
    if (event.eventType === 'change') {
      // Get Size of our file to correctly allocate Buffer
      const fileSize = (await commandFileHandler.stat()).size;
      const buffer = Buffer.alloc(fileSize);
      const offset = 0;
      const length = buffer.byteLength;
      const position = 0;

      const commandFileContent = await commandFileHandler.read(
        buffer,
        offset,
        length,
        position
      );

      console.log(commandFileContent);
    }
  }
})();
