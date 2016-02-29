# rxjsrel

[RxJS](https://github.com/ReactiveX/RxJS) based library for relational data processing.

[npm version](https://www.npmjs.com/package/rxjsrel)

# Install

`npm i rxjsrel`

# Usage

```javascript
const RxJSRel = require('rxjsrel');
const Relations = RxJSRel.Relations
```

# Examples

## Note!
You can get sets of data for examples here: [book-store](https://raw.githubusercontent.com/buchslava/rxjsrel/master/examples/data/book-store.js), [big-stub-store](https://raw.githubusercontent.com/buchslava/rxjsrel/master/examples/data/big-stub-store.js).

### Merge two tables by key

```javascript
'use strict';

const Relations = require('rxjsrel').Relations;
const data = require('./book-store');

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
```

### Merge two arrays and after - filter them

```javascript
'use strict';

const Relations = require('rxjsrel').Relations;
const data = require('./book-store');

const rel = new Relations(
  data.authors,
  data.books,
  {
    keys: {
      left: 'name',
      right: 'author'
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
    condition: rec => rec.language === 'German'
  })
  .toArray()
  .subscribe(x => console.log(x));
```

In this case you will get only one record (`language === 'German'`). Also `date` field will be transformed to Javascript date format.

### Next example illustrates grouping of merged set of data by expected criteria

```javascript
'use strict';

const Relations = require('rxjsrel').Relations;
const data = require('./book-store');

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
  .groupBy(rec => rec.author)
  .mergeMap(group => group
    .toArray()
    .map(items => {
      return {author: group.key, booksCount: items.length}
    })
  )
  .subscribe(x => console.log(x));
```

Merged set was grouped by author. Result of the grouping is count of books by related author. 

```
{ author: 'Beverly Cleary', booksCount: 4 }
{ author: 'David Sedaris', booksCount: 3 }
{ author: 'Franz Kafka', booksCount: 3 }
{ author: 'Johann Wolfgang Von Goethe', booksCount: 8 }
```

### Next example illustrates inner conditions. Inner conditions will apply before merging.
This technique is needed for big sets of data processing. We have a big data set, but next example will work quickly due to inner conditions. 
(ie filtering before merging). 

```javascript
'use strict';

const Relations = require('rxjsrel').Relations;
const data = require('./big-stub-store');

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
```

