const fs = require('fs/promises');

(async () => {
  // commands
  const CREATE_FILE = 'create a file';
  const DELETE_FILE = 'delete a file';
  const RENAME_FILE = 'rename file';
  const ADD_TO_FILE = 'add to file';

  async function createFile(filePath) {
    let existingFile;

    try {
      existingFile = await fs.open(filePath, 'r');
      existingFile.close();
      return console.log(`The file ${filePath} already exists.`);
    } catch (err) {
      // we don't have a file, go ahead and create it
      const newFile = await fs.open(filePath, 'w');
      console.log('A new file created.');
      newFile.close();
    }
  }

  async function deleteFile(filePath) {
    try {
      await fs.unlink(filePath);
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.log('No file at this path to delete.');
      } else {
        console.log('An error occured while removing the file: ' + filePath);
        console.log(err);
      }
    }

    console.log(`File ${filePath} has been deleted successfully.`);
  }

  async function renameFile(oldPath, newPath) {
    try {
      await fs.rename(oldPath, newPath);
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.log('No file at this path to rename.');
      } else {
        console.log('An error occured while renaming the file: ' + oldPath);
        console.log(err);
      }
    }

    console.log(`File ${oldPath} be renamed to ${newPath} successfully.`);
  }

  let contentAdded;

  async function addToFile(path, content) {
    try {
      if (contentAdded == content) return;
      await fs.appendFile(path, content);
      contentAdded = content;
    } catch (err) {
      console.log('An error occured while adding content to the file');
      console.log(err);
    }
  }

  // Open the file
  const commandFileHandler = await fs.open('./command.txt', 'r');

  commandFileHandler.on('change', async () => {
    console.log('File changed');
    // get the SIZE of our file
    const contentSize = (await commandFileHandler.stat()).size;
    const offset = 0;
    const position = 0;
    const buff = Buffer.alloc(contentSize);
    const contentLength = buff.byteLength;

    console.log(buff.byteLength, 'byte length');

    // Read the content when the file change
    // Allocate the right buffer size
    await commandFileHandler.read(buff, offset, contentLength, position);

    const command = buff.toString('utf-8');

    // create a file:
    // create a file <path>

    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }

    // add to file <path> this content: <content>
    if (command.includes(ADD_TO_FILE)) {
      const _idx = command.indexOf(' this content: ');
      const filePath = command.substring(ADD_TO_FILE.length + 1, _idx);
      const content = command.substring(_idx + 15);
      addToFile(filePath, content);
    }

    // delete a file <path>
    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1);
      deleteFile(filePath);
    }

    // rename file text.txt to abc.txt
    if (command.includes(RENAME_FILE)) {
      const [oldPath, , newPath] = command
        .substring(RENAME_FILE.length + 1)
        .split(' ');

      if (!oldPath || !newPath) {
        return `Please provide oldPath and newPath together`;
      }

      renameFile(oldPath, newPath);
    }
  });

  // File change watcher
  const watcher = fs.watch('./command.txt');

  for await (const event of watcher) {
    if (event.eventType === 'change') {
      commandFileHandler.emit('change');
    }
  }
})();
