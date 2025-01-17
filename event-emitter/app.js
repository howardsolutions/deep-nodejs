const EventEmitter = require('./events-implement');

class Emitter extends EventEmitter {}

const myEvent = new Emitter();

myEvent.on('foo', () => {
  console.log('Event foo occured 1.');
});

myEvent.on('foo', () => {
  console.log('Event foo occured 2.');
});

myEvent.on('foo', (someText) => {
  console.log('Event with argument occured: ' + someText);
});

myEvent.once('bar', () => {
  console.log('Im only run once');
});

myEvent.emit('foo', 'hello');
myEvent.emit('bar');
myEvent.emit('bar');
myEvent.emit('bar');
myEvent.emit('bar');
