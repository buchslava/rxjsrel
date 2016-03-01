'use strict';
const _ = require('lodash');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

const authorsPath = './test/fixtures/authors.csv';
const csvFileReader = require('../lib/csv-file-reader');

describe('csv file read checking', () => {

  describe('when good path', () => {

    it(`should contain 5 elements`, done => {
      const file$ = csvFileReader(authorsPath);
      file$
        .toArray()
        .subscribe(x => {
          expect(x.length).to.equal(5);
          done();
        });
    });

    it(`first record should be expected header`, done => {
      const file$ = csvFileReader(authorsPath);
      const expectedHeader = ['name', 'born', 'die', 'description'];
      file$
        .toArray()
        .subscribe(x => {
          expect(JSON.stringify(x[0])).to.equal(JSON.stringify(expectedHeader));
          done();
        });
    });

    it(`first record should be expected header`, done => {
      const file$ = csvFileReader(authorsPath);
      const expectedHeader = ['name', 'born', 'die', 'description'];
      file$
        .toArray()
        .subscribe(x => {
          expect(JSON.stringify(x[0])).to.equal(JSON.stringify(expectedHeader));
          done();
        });
    });

    it(`names of authors should be expected`, done => {
      const file$ = csvFileReader(authorsPath);
      const expectedNames = ['Beverly Cleary', 'David Sedaris', 'Franz Kafka', 'Johann Wolfgang Von Goethe'];
      file$
        .toArray()
        .subscribe(x => {
          for (let i = 1; i < x.length; i++) {
            expect(expectedNames.indexOf(x[i][0]) >= 0).to.equal(true);
          }
          done();
        });
    });
  });

  describe('when bad path', () => {
    it(`should be expected error`, done => {
      const badPath = 'bad-path';
      const file$ = csvFileReader(badPath);
      file$
        .toArray()
        .subscribe(
          x => {
          },
          err => {
            expect(err.message).to.equal(`${badPath} does not exists`);
            done();
          }
        );
    });
  });
});
