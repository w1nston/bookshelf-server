const env = process.env.NODE_ENV || 'development';
const config = require('./config/index')[env];

const express = require('express');
const expressRouter = new express.Router();
const logger = require('./config/logger');
const database = require('./db');
const router = require('./config/routes');

const app = express();
let server;

app.set('logger', logger);

function startServer(dbConnection) {
  app.set('dbConnection', dbConnection);
  logger.info('Established connection to mongodb');
  logger.info('Initializing server');
  logger.info('Setting up routes');
  app.use('/', router(expressRouter, app));
  server = app.listen(config.port);
  logger.info(`Server started. Listening in on port ${config.port}`);
}

function closeDbConnection() {
  const dbConnection = app.get('dbConnection');
  if (dbConnection) {
    logger.info('Closing mongoose connection.');
    dbConnection.close();
    logger.info('mongoose connection closed.');
    app.set('dbConnection', null);
  } else {
    logger.info('No mongoose connection established, nothing to close.');
  }
}

function closeServerConnection() {
  if (server) {
    logger.info('Shuting down server.');
    server.close();
    logger.info('Server is shut down.');
    server = null;
  } else {
    logger.info('No server up and running, nothing to close.');
  }
}

function stopServer(error) {
  if (error) {
    logger.error('Some error occurred, stopping the server due to:', error);
  }
  closeDbConnection();
  closeServerConnection();
}

process.on('exit', stopServer);
process.on('SIGINT', stopServer);
process.on('uncaughtException', stopServer);

database.init(app)
  .then(dbConnection => startServer(dbConnection))
  .catch(reason => stopServer(reason));
