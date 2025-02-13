const { createServer } = require('http');

const { createReadStream, stat } = require('fs');
const { promisify } = require('util');

const getFileInfo = promisify(stat);

const fileName = '../../../powder-day.mp4';

const server = createServer(async (req, res) => {
  const { size } = await getFileInfo(fileName);

  res.writeHead(200, {
    'content-type': 'video/mp4',
    'content-length': size,
  });
  
  createReadStream(fileName).pipe(res);
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
