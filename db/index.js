const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];
const dbUri = `mongodb://${config.database.host}:${config.database.port}/${config.database.name}`;

const mongoose = require('mongoose');

module.exports.init = function init() {
  return new Promise((resolve, reject) => {
    const dbConnection = mongoose.createConnection(dbUri);
    dbConnection.on('error', () => reject('Could not establish connection with mongodb'));
    resolve(dbConnection);
  });
};
