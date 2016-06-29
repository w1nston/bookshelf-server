const env = process.env.NODE_ENV || 'development';
const config = require('./config/index')[env];

const express = require('express');
const expressRouter = new express.Router();
const bodyParser = require('body-parser');
const logger = require('./config/logger');
const database = require('./db');
const router = require('./config/routes');

const app = express();
let server;

app.set('logger', logger);

function startServer() {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use('/', router(expressRouter, app));
  server = app.listen(config.port);
  logger.info(`Listening in on port ${config.port}`);
}

function stopServer(error) {
  if (error) {
    logger.error('Some error occurred, stopping the server:', error);
  }

  const dbConnection = app.get('dbConnection');
  if (dbConnection) {
    logger.info('Closing mongoose connection.');
    dbConnection.close();
    logger.info('mongoose connection closed.');
    app.set('dbConnection', null);
  }

  if (server) {
    logger.info('Shuting down server.');
    server.close();
    logger.info('Server is shut down.');
    server = null;
  }
}

process.on('exit', stopServer);
process.on('SIGINT', stopServer);
process.on('uncaughtException', stopServer);

database.init(app, startServer);
