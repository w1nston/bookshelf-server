const routerMiddleware = require('../app/middleware/routerMiddleware');
const BooksController = require('../app/controllers/booksController');
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.json({ type: 'application/x-www-form-urlencoded' });

module.exports = function routes(router, app) {
  const booksController = new BooksController(app);

  router.use(
    routerMiddleware,
    urlEncodedParser
  );

  router.route('/books')
    .get(booksController.index)
    .post(booksController.create);

  return router;
};
