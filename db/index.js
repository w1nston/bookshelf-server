const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];
const dbUri = `mongodb://${config.database.host}:${config.database.port}/${config.database.name}`;

const mongoose = require('mongoose');

module.exports.init = function init(app, callback) {
  const logger = app.get('logger');

  mongoose.connect(dbUri);
  const dbConnection = mongoose.connection;

  dbConnection.on('error', logger.error.bind(logger, 'mongo connection error:'));

  dbConnection.once('open', () => {
    logger.info('Connected to mongodb.');
    callback();
  });

  app.set('dbConnection', dbConnection);
};
