'use strict';

const Relations = require('../lib').Relations;
const data = require('./data/book-store');

const rel = new Relations(
  data.authors,
  data.books,
  {
    keys: {
      left: 'name',
      right: 'author',
    },
    transform: rec => {
      if (rec[1].date) {
        rec[1].date = new Date(rec[1].date);
      }

      return Relations.getDefaultTransformer()(rec)
    }
  }
);

rel
  .join({
    condition: rec => rec.language === 'German',
  })
  .toArray()
  .subscribe(x => console.log(x));
