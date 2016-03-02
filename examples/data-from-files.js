'use strict';

const Relations = require('../lib').Relations;

const booksStore$ = new Relations(
  './data/authors.csv',
  './data/books.csv',
  {
    keys: {
      left: 'name',
      right: 'author'
    },
    transform: Relations.getDefaultTransformer()
  }
).join().subscribe(x => console.log(x));

/*const comments$ = new Relations(
  booksStore$,
  './data/comments.csv',
  {
    keys: {
      left: 'title',
      right: 'book'
    },
    transform: Relations.getDefaultTransformer()
  }
).join();

comments$.subscribe(x => console.log(x));*/
