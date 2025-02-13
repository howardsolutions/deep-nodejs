const { Readable } = require('stream');

const peaks = [
  'Tallac',
  'Ralston',
  'Rubicon',
  'Twin Peaks',
  'Castle Peak',
  'Rose',
  'Freel Peak',
];

class StreamFromArray extends Readable {
  constructor(array) {
    // super({ encoding: 'utf-8' }); => read data in string format
    super({ objectMode: true }); // can read any type of js object
    this.array = array;

    this.index = 0;
  }

  _read() {
    if (this.index > this.array.length - 1) {
      // push null to mark end of the stream
      // otherwise it will run forever
      return this.push(null);
    }

    // const chunk = this.array[this.index];
    const chunk = {
      data: this.array[this.index],
      index: this.index,
    };
    // push chunk of data into stream
    this.push(chunk);
    this.index++;
  }
}

const peakStream = new StreamFromArray(peaks);

peakStream.on('data', (chunk) => {
  console.log(chunk);
});

peakStream.on('end', () => console.log('done'));
