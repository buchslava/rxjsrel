'use strict';

const Rx = require('rxjs');
const data = require('./data');

const filterByKeys = (r, options) =>
(!options.keys || !options.keys.left || !options.keys.right) ||
r[0][options.keys.left] === r[1][options.keys.right];

const defaultTransformer = rec => Object.assign({}, rec[0], rec[1]);

const join = (left, right, options) =>
  left.concatMap(x => right.map(y => [x, y]))
    .filter(r => filterByKeys(r, options))
    .map(r => (options.transform || (x => x))(r))
    .filter(r => (options.condition || (() => true))(r));

join(
  Rx.Observable.from(data.authors),
  Rx.Observable.from(data.books),
  {
    keys: {
      left: 'name',
      right: 'author',
    },
    condition: rec => rec.language === 'German',
    transform: defaultTransformer
  })
  .toArray()
  .subscribe(x => console.log(x));
