const fs = require('fs/promises');

(async () => {
  // OPEN the file
  const commandFileHandler = fs.open('./command.txt', 'r');

  const watcher = fs.watch('./command.txt');

  for await (const event of watcher) {
    // File Changed!
    fs.open();
  }
})();
