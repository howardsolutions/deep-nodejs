module.exports = class EventEmitter {
  // Master Object
  listeners = {};

  addListener(eventName, fn) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(fn);

    return this;
  }

  on(eventName, callback) {
    return this.addListener(eventName, callback);
  }

  emit(eventName, ...args) {
    // get list of callback fns associated with this eventNames
    let fns = this.listeners[eventName];

    if (!fns) return false;

    fns.forEach((fn) => fn(...args));

    return true;
  }

  once(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];

    const onceWrapper = () => {
      fn();
      this.off(eventName, onceWrapper);
    };

    this.listeners[eventName].push(onceWrapper);

    return this;
  }

  off(eventName, fn) {
    return this.removeListener(eventName, fn);
  }

  removeListener(eventName, fn) {
    let currentList = this.listeners[eventName];

    if (!currentList) return this;

    this.listeners[eventName] = currentList.filter((f) => f !== fn);

    return this;
  }

  countListeners(eventName) {
    let fns = this.listeners[eventName] || [];

    return fns.length;
  }
};
