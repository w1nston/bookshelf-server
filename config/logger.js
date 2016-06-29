const winston = require('winston');
const env = process.env.NODE_ENV || 'development';

module.exports = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
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
