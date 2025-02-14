const { createServer } = require('http');

const { createReadStream, stat, createWriteStream } = require('fs');
const { promisify } = require('util');

const getFileInfo = promisify(stat);

const fileName = '../../../powder-day.mp4';

async function responseWithVideo(req, res) {
  const { size } = await getFileInfo(fileName);

  const range = req.rawHeaders.range;

  if (!range) {
    res.writeHead(200, {
      'content-type': 'video/mp4',
      'content-length': size,
    });

    createReadStream(fileName).pipe(res);
  } else {
    let [start, end] = range.replace(/bytes=/, '').split('-');
    start = parseInt(start, 10);
    end = end ? parseInt(end, 10) : size - 1;

    res.writeHead(206, {
      'content-type': 'video/mp4',
      'accept-ranges': 'bytes',
      'content-length': end - start + 1,
      'content-range': `bytes ${start}-${end}/${size}`,
    });

    createReadStream(fileName, { start, end }).pipe(res);
  }
}

const server = createServer((req, res) => {
  if (req.method === 'POST') {
    req.pipe(res);
    req.pipe(process.stdout);
    req.pipe(createWriteStream('./upload.file'));
  } else if (req.url === '/video') {
    responseWithVideo(req, res);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <form enctype="multipart/form-data" method="POST" action="/">
        <input type="file" name="upload-file" />
        <button>Upload File</button>
      </form>
    `);
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
