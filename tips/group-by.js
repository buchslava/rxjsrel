var Rx = require('rxjs');

var items = ["Apple", "Ananas", "Mango", "Banana", "Beer"];

Rx.Observable.fromArray(items)
  .groupBy(s => s[0])
  .mergeMap(group => group
    .toArray()
    .map(items => {
      return {key: group.key, value: items}
    })
  )
  .subscribe(s => console.log(s));
