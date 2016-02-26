'use strict';

const Rx = require('rxjs');

const join1 = (o1, o2) => o1.concatMap(x => o2, (x, y) => [x, y]);
const join2 = (o1, o2) => o1.concatMap(x => o2.map(y => [x, y]));

join1(Rx.Observable.of(1, 2, 3), Rx.Observable.of('a', 'b', 'c'))
  .subscribe(x => console.log('case#1', x));

join2(Rx.Observable.of(1, 2, 3), Rx.Observable.of('a', 'b', 'c'))
  .subscribe(x => console.log('case#2', x));
