const express = require('express');
const router = express.Router();
const Book  = require('../models').Book;

/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      // Forward error to the global error handler
      next(error);
    }
  }
}

/* GET home page. */
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll();
  console.log(books)
  res.render("index", { books, title: 'the SQL Library Manager' });
}));

/* Show the full list of books */
router.get('/books', asyncHandler(async (req, res) => {
  res.render('book', {})
}));

/* Shows the create new book form */
router.get('/books/new', asyncHandler(async (req, res) => {
  res.render('book', {})
}));

/* Posts a new book to the database */
router.post('/books/new', asyncHandler(async (req, res) => {
  res.render('book', {})
}));

/* Shows book detail form */
router.get('/books/:id', asyncHandler(async (req, res) => {
  res.render('book', {})
}));

/* Updates book info in the database */
router.post('/books/:id', asyncHandler(async (req, res) => {
  res.render('book', {})
}));

/* Deletes a book */
router.post('/books/:id/delete', asyncHandler(async (req, res) => {
  res.render('book', {})
}));

module.exports = router;
