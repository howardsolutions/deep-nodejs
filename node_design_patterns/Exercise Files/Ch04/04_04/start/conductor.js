class Conductor {
  constructor() {
    this.history = [];
    this.undone = [];
  }

  run(command) {
    console.log(`Executing command: ${command.name}`);
    command.execute();
    this.history.push(command);
  }

  printHistory() {
    this.history.forEach((command) => console.log(command.name));
  }

  undo() {
    const command = this.history.pop();
    console.log('Undo command');
    command.undo();
    this.undone.push(command);
  }

  redo() {
    const command = this.history.pop();
    console.log('Undo redo');
    command.execute();
    this.history.push(command);
  }
}

module.exports = new Conductor();
