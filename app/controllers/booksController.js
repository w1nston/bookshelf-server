const BookModel = require('../models/bookModel');

module.exports = function BooksController(app) {
  const logger = app.get('logger');
  const bookModel = new BookModel(app);

  return {
    index(request, response) {
      bookModel.findAll((error, books) => {
        if (error) {
          logger.error('Server responded with status 500');
          logger.error('Internal error', error);
          return response
            .status(500)
            .json(error);
        }
        logger.info('Response status: 200');
        return response
          .status(200)
          .json(books);
      });
    },

    create(request, response) {
      bookModel.create(request.body, error => {
        if (error) {
          logger.error('Server responded with status 500');
          logger.error('Internal error:', error);
          return response
            .status(500)
            .send(error);
        }
        logger.info('Server responded with status 201');
        return response
          .status(201)
          .send({ message: 'BookModel added!' });
      });
    },
  };
};
