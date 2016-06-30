const routerMiddleware = require('../app/middleware/routerMiddleware');
const BooksController = require('../app/controllers/booksController');

module.exports = function routes(router, app) {
  const booksController = new BooksController(app);

  router.use(routerMiddleware);

  router.route('/books')
    .get(booksController.index)
    .post(booksController.create);

  return router;
};
