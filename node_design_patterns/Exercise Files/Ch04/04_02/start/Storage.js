class Storage {
  constructor(name, inventory = [], deliveryTime = 0) {
    this.name = name;
    this.inventory = inventory;
    this.deliveryTime = deliveryTime;
    this.next = null;
  }

  setNext(storage) {
    this.next = storage;
  }

  lookInLocalInventory(itemName) {
    const idx = this.inventory.map((item) => item.name).indexOf(itemName);

    return this.inventory[idx];
  }

  find(itemName) {
    const found = this.lookInLocalInventory(itemName);

    if (found) {
      return {
        name: found.name,
        qty: found.qty,
        location: this.name,
        deliveryTime:
          this.deliveryTime == 0 ? 'now' : `${this.deliveryTime} days`,
      };
    } else if (this.next) {
      return this.next.find(itemName);
    } else {
      return `We cannot found this item ${itemName}`;
    }
  }
}

modules.exports = Storage;
