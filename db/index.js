const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];
const dbUri = `mongodb://${config.database.host}:${config.database.port}/${config.database.name}`;

const mongoose = require('mongoose');

module.exports.init = function init() {
  return new Promise((resolve, reject) => {
    mongoose.connect(dbUri);
    const dbConnection = mongoose.connection;
    dbConnection.on('error', () => reject('mongodb connection error'));
    resolve(dbConnection);
  });
};
