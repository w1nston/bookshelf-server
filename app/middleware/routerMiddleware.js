const logger = require('../../config/logger');

function logIncomingRequest(request) {
  logger.info(`Incoming ${request.method} request to ${request.originalUrl}`);
}

function logOutgoingResponse(response) {
  logger.info(`Response status: ${response.statusCode}`);
}

function addHeadersToResponse(response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Method', 'GET,POST');
}

module.exports = function routerMiddleware(request, response, next) {
  logIncomingRequest(request);
  logOutgoingResponse(response);
  addHeadersToResponse(response);
  next();
};
