'use strict';
const _ = require('lodash');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

const authorsPath = './test/fixtures/authors.csv';
const data = require('./fixtures/book-store');
const csvDataGetter = require('../lib/csv-data-getter');

describe('csv file get checking', () => {

  describe('when good path', () => {

    it(`should contain 4 elements`, done => {
      csvDataGetter(authorsPath)
        .toArray()
        .subscribe(x => {
          expect(x.length).to.equal(4);
          done();
        });
    });

    it(`all data should be expected`, done => {
      csvDataGetter(authorsPath)
        .toArray()
        .subscribe(x => {
          for (let i = 0; i < x.length; i++) {
            expect(x[i].name === data.authors[i].name).to.equal(true);
            expect(x[i].born === data.authors[i].born).to.equal(true);
            expect(x[i].description === data.authors[i].description).to.equal(true);
          }
          done();
        });
    });
  });

  describe('when bad path', () => {
    it(`should be expected error`, done => {
      const badPath = 'bad-path';
      csvDataGetter(badPath)
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
