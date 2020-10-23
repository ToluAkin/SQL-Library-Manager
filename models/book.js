'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Book extends Sequelize.Model {}
  Book.init({
    title: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: 'Please provide a value for the book title',
        },
      },
    },
    author: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg:  "Please provide a value for the author's name",
        },
      },
    },
    genre: Sequelize.STRING,
    year: Sequelize.INTEGER
  }, {
    sequelize,
  });
  return Book;
};