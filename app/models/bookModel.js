const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function bookSchema() {
  return new Schema({
    title: String,
    author: String,
  });
}

module.exports = function bookModel(app) {
  const dbConnection = app.get('dbConnection');
  const model = dbConnection.model('BookModel', bookSchema());

  return {
    create(book, callback) {
      model.create(book, callback);
    },

    findAll(callback) {
      model.find(callback);
    },
  };
};
