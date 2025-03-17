// 0100 1000 0110 1001 0010 0001

const { Buffer } = require('buffer');

const buff = Buffer.alloc(3); // 24 bits = 3 bytes

buff[0] = 0x48;
buff[1] = 0x69;
buff[2] = 0x21;

console.log(buff);

console.log(buff.toString('utf-8')); // Hi!
console.log(buff.toString('hex'));
