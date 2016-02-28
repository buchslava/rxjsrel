'use strict';

const Relations = require('../lib').Relations;
const data = require('./data/big-stub-store');

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

let namesArr = [];
for (let i = 0; i < 10; i++) {
  namesArr.push(`book ${i}`);
}

let authorArr = ['author #20', 'author #2000'];

console.log(new Date());
rel
  /*.join({
    condition: rec => namesArr.indexOf(rec.title) >= 0 && authorArr.indexOf(rec.name) >= 0
  })*/
  .join()
  .toArray()
  .subscribe(x => {
    console.log(x.length);
    console.log(new Date());
  });
