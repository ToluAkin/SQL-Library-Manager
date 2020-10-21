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
      next(error)
    }
  }
}

/* Show the full list of books */
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll();
  console.log(books)
  res.render('index', {  books, title: 'SQL Library Manager' })
}));

/* Shows the create new book form */
router.get('/new', asyncHandler(async (req, res) => {
  res.render('new-book')
}));

/* Posts a new book to the database */
router.post('/books/new', asyncHandler(async (req, res) => {
  await Book.create(req.body)
  res.redirect('/books')
}));

/* Shows book detail form */
router.get('/books/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render('update-book', { book })
}));

/* Updates book info in the database */
router.post('/books/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.update(req.body);
  res.render('books', {})
}));

/* Deletes a book */
router.post('/books/:id/delete', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect('/books')
}));

module.exports = router;
