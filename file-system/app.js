const fs = require('fs/promises');

const CREATE_A_FILE = 'create a file';

(async () => {
  // OPEN the file
  const commandFileHandler = await fs.open('./command.txt', 'r');

  commandFileHandler.on('change', async () => {
    // Get Size of our file to correctly allocate Buffer
    const fileSize = (await commandFileHandler.stat()).size;
    // Allocate the buffer with the file size
    const buffer = Buffer.alloc(fileSize);
    // The location at which we want to start filling our buffer
    const offset = 0;
    // How many bytes we want to read
    const length = buffer.byteLength;
    // the position at which we want to start reading the file from
    const position = 0;
    // we always want to read the whole content (from beginning all the way to the end)
    const commandFileContent = await commandFileHandler.read(
      buffer,
      offset,
      length,
      position
    );

    const command = buffer.toString('utf-8');

    // Create a File: <create a file <path> >

    if (command.includes(CREATE_A_FILE)) {
      const filePath = command.substring(CREATE_A_FILE.length + 1);
      await createFile(filePath);
    }
  });

  // WATCHER - watch for a change in a file
  const watcher = fs.watch('./command.txt');

  for await (const event of watcher) {
    // File Changed! READ file content
    if (event.eventType === 'change') {
      commandFileHandler.emit('change');
    }
  }

  // Create File Fn
  async function createFile(filePath) {
    try {
      await fs.writeFile(filePath, '', { flag: 'wx' });
      console.log(`File created successfully at: ${filePath}`);
    } catch (err) {
      if (err.code === 'EEXIST') {
        throw new Error(`File already exists at: ${filePath}`);
      }
      throw err; // Re-throw any other errors
    }
  }
})();
