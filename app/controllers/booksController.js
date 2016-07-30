const bookModel = require('../models/bookModel');

module.exports = function booksController(app) {
  const logger = app.get('logger');
  const book = bookModel(app.get('dbConnection'));

  return {
    index(request, response) {
      return book.findAll()
        .then(books => response.status(200).json(books))
        .catch(error => {
          logger.error('Internal error: ', error);
          response.status(500).json(error);
        });
    },

    create(request, response) {
      book.create(request.body)
        .then(() => response.status(201).send({ message: 'Book model added' }))
        .catch(error => {
          logger.error('Internal error: ', error);
          response.status(500).send(error);
        });
    },
  };
};
