var scount_prototype = require('./scout_prototype');

var alex = scount_prototype.clone();
alex.name = 'Alex Banks';

var eve = scount_prototype.clone();
alex.name = 'Eve';

console.log(`${alex.name}: ${alex.shoppingList}`);
console.log(`${eve.name}: ${eve.shoppingList}`);
