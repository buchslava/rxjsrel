'use strict';

let _authors = [];
let _books = [];

for (let i = 0; i <  500; i++) {
  let author = {
    name: `author #${i}`,
    born: `April 12, 2016`,
    description: `desc #${i}`
  };
  _authors.push(author);
  for (let j = 0; j < 1000; j++) {
    _books.push({
        author: author.name,
        title: `book ${j}`,
        language: 'German',
        type: ['Paperback'],
        date: 'December 5, 2008'
      }
    );
  }
}

exports.authors = _authors;
exports.books = _books;
