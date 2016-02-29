'use strict';

const Relations = require('../lib').Relations;
const data = require('./data/big-stub-store');

let namesArr = [`book 5`, `book 7`];
let authorArr = ['author #20', 'author #2000'];

const rel = new Relations(
  data.authors,
  data.books,
  {
    keys: {
      left: 'name',
      right: 'author'
    },
    transform: Relations.getDefaultTransformer()
  }
);

rel
  .join({
    conditions: {
      left: rec => authorArr.indexOf(rec.name) >= 0,
      right: rec => namesArr.indexOf(rec.title) >= 0
    }
  })
  .toArray()
  .subscribe(x => console.log(x));
