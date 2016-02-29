'use strict';

const Relations = require('../lib').Relations;
const data = require('./data/book-store');

const booksStore$ = new Relations(
  data.authors,
  data.books,
  {
    keys: {
      left: 'name',
      right: 'author'
    },
    transform: Relations.getDefaultTransformer()
  }
).join();

const comments$ = new Relations(
  booksStore$,
  data.comments,
  {
    keys: {
      left: 'title',
      right: 'book'
    },
    transform: Relations.getDefaultTransformer()
  }
).join();

comments$.subscribe(x => console.log(x));
