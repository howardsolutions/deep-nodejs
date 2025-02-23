var fs = require('fs');

class FS_Proxy {
  constructor() {
    this.fs = fs;
  }

  readFile(path, format, callback) {
    if (!path.match(/.md$|.MD$/)) {
      return callback(new Error('Can ONLY read Markdown files.'));
    }

    this.fs.readFile(path, format, (err, contents) => {
      if (err) {
        console.error(err);
        return callback(err);
      }

      return callback(null, contents);
    });
  }

  writeFile() {}

  appendFile() {}
}

module.exports = new FS_Proxy();
