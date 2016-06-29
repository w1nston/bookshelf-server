const Book = require('../models/book');

module.exports = function BooksController(app) {
  const logger = app.get('logger');

  return {
    index(request, response) {
      Book.find((error, books) => {
        if (error) {
          logger.error(error);
          return response
            .status(500)
            .json(error);
        }

        return response
          .status(200)
          .json(books);
      });
    },
  };
};
