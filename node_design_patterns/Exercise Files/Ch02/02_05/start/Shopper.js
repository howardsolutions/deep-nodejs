class Shopper {
  constructor(name = 'unnamed person') {
    this._name = name;
    this._shoppingList = [];
  }

  set name(value) {
    this._name = value;
  }

  get name() {
    return this._name;
  }

  get shoppingList() {
    return this._shoppingList.join(', ');
  }

  addItemToList(item) {
    this._shoppingList.push(item);
  }

  clone() {
    const currentObjPrototype = Object.getPrototypeOf(this);
    const clonedObj = Object.create(currentObjPrototype);

    clonedObj._name = this._name;
    clonedObj._shoppingList = [...this._shoppingList];

    return clonedObj;
  }
}

module.exports = Shopper;
