const logger = require('../../config/logger');
// TODO Get logger from app instead
function logIncomingRequest(request) {
  logger.info(`Incoming ${request.method} request to ${request.originalUrl}`);
}

module.exports = function routerMiddleware(request, response, next) {
  logIncomingRequest(request);
  // TODO Log response
  next();
};
