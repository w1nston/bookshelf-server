const routerMiddleware = require('../app/middleware/routerMiddleware');
const booksController = require('../app/controllers/booksController');
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.json({ type: 'application/x-www-form-urlencoded' });

module.exports = function routes(router, app) {
  const booksCtrl = booksController(app);

  router.use(
    routerMiddleware,
    urlEncodedParser
  );

  router.route('/books')
    .get(booksCtrl.index)
    .post(booksCtrl.create);

  return router;
};
