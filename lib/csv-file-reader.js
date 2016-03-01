'use strict';

const fs = require('fs');
const Rx = require('rxjs');
const parse = require('csv-parse');
var Subject = Rx.Subject;

module.exports = filePath => {
  const subject = new Subject();
  const parser = parse({});
  let record, output = [];

  parser.on('readable', () => {
    while (record = parser.read()) {
      subject.next(record);
    }
  });
  parser.on('error', err => subject.error(err));
  parser.on('finish', () => subject.complete(output));

  fs.exists(filePath, exists => {
    if (!exists) {
      subject.error(new Error(`${filePath} does not exists`));
      return;
    }

    fs.createReadStream(filePath).pipe(parser);
  });

  return subject;
};
