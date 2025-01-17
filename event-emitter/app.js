const EventEmitter = require('events');

class Emitter extends EventEmitter {}

const myEvent = new Emitter();

myEvent.on('foo', () => {
  console.log('Event foo occured.');
});

myEvent.emit('foo');
