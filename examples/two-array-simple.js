'use strict';

const Relations = require('../lib').Relations;
const data = require('./data/book-store');

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
  .join()
  .toArray()
  .subscribe(x => console.log(x));
