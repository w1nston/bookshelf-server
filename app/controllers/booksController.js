const BookModel = require('../models/bookModel');

module.exports = function BooksController(app) {
  const logger = app.get('logger');
  const bookModel = new BookModel(app);

  return {
    index(request, response) {
      bookModel.findAll((error, books) => {
        if (error) {
          logger.error('Internal error', error);
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
      bookModel.create(request.body, error => {
        if (error) {
          logger.error('Internal error:', error);
          return response
            .status(500)
            .send(error);
        }
        return response
          .status(201)
          .send({ message: 'BookModel added!' });
      });
    },
  };
};
