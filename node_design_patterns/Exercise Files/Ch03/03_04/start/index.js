var path = require('path');

const FS_Proxy = require('./FS_Proxy');

// var txtFile = path.join(__dirname, 'Readme.txt');
var mdFile = path.join(__dirname, 'Readme.md');

var result = (error, contents) => {
  if (error) {
    console.log('\x07');
    console.error(error);
    process.exit(0);
  }

  console.log('reading file...');
  console.log(contents);
};

// FS_Proxy.readFile(txtFile, 'UTF-8', result);
FS_Proxy.readFile(mdFile, 'UTF-8', result);
