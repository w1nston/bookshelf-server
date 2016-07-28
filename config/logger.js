const winston = require('winston');
const moment = require('moment');
const env = process.env.NODE_ENV || 'development';

module.exports = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: function() {
        return moment().toISOString();
      },
      formatter: function(options) {
        return '[' + options.timestamp() + '] ' +
          options.level.toUpperCase() + ' ' +
          (undefined !== options.message ? options.message : '') +
          (
            options.meta &&
            Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : ''
          );
      }
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
