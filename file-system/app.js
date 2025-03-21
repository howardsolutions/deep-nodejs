const fs = require('fs/promises');

const CREATE_A_FILE = 'create a file';
const DELETE_A_FILE = 'delete a file';
const RENAME_FILE = 'rename the file';
const ADD_TO_FILE = 'add to the file';

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

    // Create a File: <delete a file <path> >
    if (command.includes(DELETE_A_FILE)) {
      const filePath = command.substring(DELETE_A_FILE.length + 1);
      await deleteFile(filePath);
    }

    // Create a File: <add to the file <path> this content: <content> >
    if (command.includes(ADD_TO_FILE)) {
      const _idx = commandl.indexOf(' this content: ');
      const filePath = command.substring(ADD_TO_FILE.length + 1, _idx);
      const content = command.substring(_idx + 15);
      await addToFile(filePath, content);
    }

    // Rename a File: <rename the file <path> to <new-path> >
    if (command.includes(RENAME_FILE)) {
      const _idx = command.indexOf(' to ');
      const oldFilePath = command.substring(RENAME_FILE.length + 1, _idx);
      const newFilePath = command.substring(_idx + 4);

      renameFile(oldFilePath, newFilePath);
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
        console.log(`File already exists at: ${filePath}`);
      }
    }
  }

  // delete File
  async function deleteFile(filePath) {
    try {
      // Check if file exists first
      await fs.stat(filePath);

      // If file exists, delete it
      await fs.unlink(filePath);
      console.log(`File deleted successfully: ${filePath}`);
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.log(`File does not exist at: ${filePath} to delete`);
      }
    }
  }

  // rename file
  async function renameFile(oldPath, newPath) {
    try {
      await fs.rename(oldPath, newPath);
      console.log(`File renamed successfully from ${oldPath} to ${newPath}`);
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.log(`File does not exist at: ${oldPath}`);
      } else if (err.code === 'EEXIST') {
        console.log(`A file already exists at: ${newPath}`);
      }
    }
  }

  // Add Content to file
  async function addToFile(path, content) {}
})();
