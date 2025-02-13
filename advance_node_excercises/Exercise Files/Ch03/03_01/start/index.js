const { createServer } = require('http');

const { createReadStream, stat } = require('fs');
const { promisify } = require('util');

const getFileInfo = promisify(stat);

const fileName = '../../../powder-day.mp4';

const server = createServer(async (req, res) => {
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
      'content-length': end - start + 1,
      'content-range': `bytes ${start}-${end}/${size}`,
      'accept-ranges': 'bytes',
      'content-type': 'video/mp4',
    });

    createReadStream(fileName, { start, end }).pipe(res);
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
