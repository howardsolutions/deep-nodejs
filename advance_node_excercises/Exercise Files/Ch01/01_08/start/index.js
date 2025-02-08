var delay = (seconds) =>
  new Promise((resolves) => {
    setTimeout(resolves, seconds * 1000);
  });

var tasks = [
  delay(4),
  delay(6),
  delay(4),
  delay(3),
  delay(5),
  delay(7),
  delay(9),
  delay(10),
  delay(3),
  delay(5),
];

class PromiseQueue {
  constructor(promises = [], concurrentCount = 1) {
    this.concurrent = concurrentCount;
    this.total = promises.length;

    this.todo = promises;
    this.currentTasksRunning = [];
    this.completed = [];
  }

  get canRunAnother() {
    // make sure current running task smaller than the allowed concurrent amount
    // this.todo.length - make sure we have tasks left to be executed
    return (
      this.currentTasksRunning.length < this.concurrent && this.todo.length
    );
  }

  run() {
    while (this.canRunAnother) {
      const currentPromise = this.todo.shift();

      // handle when the currentPromise fulfilled, at it to completed list
      currentPromise.then(() => {
        this.completed.push(this.currentTasksRunning.shift());

        // invoke run again
        this.run();
      });

      // remove currentPromise from todo list, add it to running list
      this.currentTasksRunning.push(currentPromise);
    }
  }
}

const delayQueue = new PromiseQueue(tasks, 2);

delayQueue.run();
