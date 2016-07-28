const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function bookSchema() {
  return new Schema({
    title: String,
    author: String,
  }, { timestamps: true });
}

module.exports = function bookModel(app) {
  const dbConnection = app.get('dbConnection');
  const model = dbConnection.model('Book', bookSchema());

  return {
    create(book) {
      return model.create(book);
    },

    findAll() {
      return model.find().exec();
    },
  };
};
