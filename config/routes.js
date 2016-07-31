const routerMiddleware = require('../app/middleware/routerMiddleware');
const bookModelFactory = require('../app/models/bookModel');
const booksControllerFactory = require('../app/controllers/booksController');
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.json({ type: 'application/x-www-form-urlencoded' });

function createBooksController(dbConnection) {
  const bookModel = bookModelFactory(dbConnection);
  return booksControllerFactory(bookModel);
}

module.exports = function routes(router, dbConnection) {
  const booksController = createBooksController(dbConnection);

  router.use(
    routerMiddleware,
    urlEncodedParser
  );

  router.route('/books')
    .get(booksController.index)
    .post(booksController.create);

  return router;
};
