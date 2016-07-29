const winston = require('winston');
const moment = require('moment');
const env = process.env.NODE_ENV || 'development';

function printLogMessage(message) {
  if (message !== undefined) {
    return message;
  }
  return '';
}

module.exports = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp() {
        return moment().toISOString();
      },
      formatter(options) {
        return `[${options.timestamp()}][${options.level.toUpperCase()}]` +
          `${printLogMessage(options.message)}`;
      },
    }),
    new (winston.transports.File)({
      name: 'info-file',
      filename: `./logs/info.${env}.log`,
      level: 'info',
    }),
    new (winston.transports.File)({
      name: 'error-file',
      filename: `./logs/error.${env}.log`,
      level: 'error',
    }),
  ],
});
