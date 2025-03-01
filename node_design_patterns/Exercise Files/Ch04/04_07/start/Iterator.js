class Iterator {
  constructor(items = []) {
    this.items = items;
    this.idx = 0;
  }

  first() {
    return this.items[0];
  }

  last() {
    return this.items[this.items.length - 1];
  }

  next() {
    if (this.hasNext()) {
      this.idx++;
    }

    return this.current();
  }

  prev() {
    if (this.idx >= 0) {
      this.idx -= 1;
    }

    return this.current();
  }

  current() {
    return this.items[this.idx];
  }

  hasNext() {
    return this.idx < this.items.length - 1;
  }
}

module.exports = Iterator;
