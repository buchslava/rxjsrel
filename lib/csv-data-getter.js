'use strict';

const _ = require('lodash');
const fileReader = require('./csv-file-reader');

module.exports = path => {
  const file$ = fileReader(path);
  return file$.first().mergeMapTo(file$, _.zipObject);
};
