const { Buffer } = require('buffer');

// Allocate a buffer with size 4 bytes = 32 bits
// const memoryContainer = Buffer.alloc(4);

// console.log(memoryContainer);

// Write to the buffer
// memoryContainer[0] = 0xf4;
// memoryContainer.writeInt8(-32, 2);

// console.log(memoryContainer);
// console.log(memoryContainer[0]);
// console.log(memoryContainer.readInt8(2));

// console.log(memoryContainer.toString("hex"));

// Other way to create buffer

const buff = Buffer.from("486921", "hex");
console.log(buff.toString("utf-8"))