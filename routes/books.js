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
  res.render('new-book', { title: 'Create New Book' })
}));

/* Posts a new book to the database */
router.post('/', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect('/')
  } catch (error) {
    if(error.name === "SequelizeValidationError") { // checking the error
      book = await Book.build(req.body);
      res.render('new-book', { book, errors: error.errors, title: 'Create New Book' });
    } else {
      throw error; // error caught in the asyncHandler's catch block
    }
  }
}));

/* Shows book detail form */
router.get('/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    res.render('update-book', { book, title: book.title})
  } else {
    res.sendStatus(404);
  }
}));

/* Updates book info in the database */
router.post('/:id/update', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    await book.update(req.body);
    res.redirect('/');
  } catch (error) {
    if(error.name === "SequelizeValidationError") { // checking the error
      book = await Book.build(req.body);
      res.render('update-book', { book, errors: error.errors, title: `Update ${book.title}`});
    } else {
      throw error; // error caught in the asyncHandler's catch block
    }
  }
}));

/* Deletes a book */
router.post('/:id/delete', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect('/')
}));

module.exports = router;
