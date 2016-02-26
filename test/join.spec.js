'use strict';
const _ = require('lodash');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

const data = require('./fixtures/book-store');
const Relations = require('../lib').Relations;

describe('join checking', () => {

  describe('when full join', () => {
    const rel = new Relations(data.authors, data.books);

    it(`length of result should be 72`, done => {
      rel
        .join()
        .toArray()
        .subscribe(x => {
          expect(x.length).to.equal(72);
          done();
        });
    });

    it(`each result element should be an array`, done => {
      rel
        .join()
        .toArray()
        .subscribe(x => {
          x.forEach(r => {
            expect(_.isArray(r)).to.equal(true);
          });
          done();
        });
    });
  });

  describe('when join by keys', () => {
    const rel = new Relations(
      data.authors,
      data.books,
      {
        keys: {
          left: 'name',
          right: 'author'
        }
      });

    it(`length of result should be 18`, done => {
      rel
        .join()
        .toArray()
        .subscribe(x => {
          expect(x.length).to.equal(18);
          done();
        });
    });
    it(`each result element should be an array`, done => {
      rel
        .join()
        .toArray()
        .subscribe(x => {
          x.forEach(r => {
            expect(_.isArray(r)).to.equal(true);
          });
          done();
        });
    });
  });

  describe('when merge result into one object', () => {
    const rel = new Relations(
      data.authors,
      data.books,
      {
        keys: {
          left: 'name',
          right: 'author'
        },
        transform: Relations.getDefaultTransformer()
      });

    it(`length of result should be 18`, done => {
      rel
        .join()
        .toArray()
        .subscribe(x => {
          expect(x.length).to.equal(18);
          done();
        });
    });

    it(`each result element should be plain object`, done => {
      rel
        .join()
        .toArray()
        .subscribe(x => {
          x.forEach(r => {
            expect(r instanceof Object).to.equal(true);
            expect(_.isArray(r)).to.equal(false);
          });
          done();
        });
    });
  });

  describe('when filteres and merged result', () => {
    const rel = new Relations(
      data.authors,
      data.books,
      {
        keys: {
          left: 'name',
          right: 'author'
        },
        transform: Relations.getDefaultTransformer()
      });

    it(`length of result should be 1`, done => {
      rel
        .join({
          condition: rec => rec.language === 'German'
        })
        .toArray()
        .subscribe(x => {
          expect(x.length).to.equal(1);
          done();
        });
    });

    it(`result should be plain object in accordance with the condition`, done => {
      rel
        .join({
          condition: rec => rec.language === 'German'
        })
        .toArray()
        .subscribe(x => {
          x.forEach(r => {
            expect(r instanceof Object).to.equal(true);
            expect(_.isArray(r)).to.equal(false);
            expect(r.language).to.equal('German');
          });
          done();
        });
    });
  });
});
