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

    create(request, response) {
      const book = new Book();
      book.title = request.body.title;
      book.author = request.body.author;
      book.save(error => {
        if (error) {
          return response
            .status(500)
            .send(error);
        }

        return response
          .status(200)
          .send({ message: 'Book added!' });
      });
    },
  };
};
