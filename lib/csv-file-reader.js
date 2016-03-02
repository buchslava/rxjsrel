'use strict';

const fs = require('fs');
const Rx = require('rxjs');
const parse = require('csv-parse');
const Subject = Rx.Subject;
const stat$ = Rx.Observable.bindNodeCallback(fs.stat);

function fileRead(filePath) {
  const subject = new Subject();
  const parser = parse({});
  let record, output = [];

  parser.on('readable', function () {
    while (record = parser.read()) {
      subject.next(record);
    }
  });
  parser.on('error', function (err) {
    subject.error(err);
  });
  parser.on('finish', function () {
    subject.complete(output);
  });

  fs.createReadStream(filePath).pipe(parser);

  return subject;
}

module.exports = filePath => {
  const subject = new Subject();

  stat$(filePath)
    .subscribe(
      () => {
        fileRead(filePath).subscribe(subject);
      },
      () => {
        subject.error(new Error(`${filePath} does not exists`));
        subject.complete();
      });

  return subject;
};
