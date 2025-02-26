class CatalogGroup {
  constructor(name, items) {
    this.name = name;
    this.items = items;
  }

  get total() {
    const totalPrice = this.items.reduce((acc, curItem) => {
      acc += curItem.price;
      return acc;
    }, 0);

    console.log(`All items total: ${totalPrice}`);
  }

  print() {
    console.log(`Group Product name: ${this.name}`);
    
    for (let item of this.items) {
      const { name, price } = item;
      console.log(`Product name: ${name} and price: ${price}`);
    }
  }
}

module.exports = CatalogGroup;
