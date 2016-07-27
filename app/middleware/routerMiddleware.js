const moment = require('moment');
const logger = require('../../config/logger');

function logIncomingRequest(request) {
  logger.info(
    `[${moment().toISOString()}] Incoming ${request.method} request to ${request.originalUrl}`
  );
}

function addHeadersToResponse(response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Method', 'GET,POST');
}

module.exports = function routerMiddleware(request, response, next) {
  logIncomingRequest(request);
  addHeadersToResponse(response);
  next();
};
