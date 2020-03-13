const debug = require('debug')('api');
const isDev = process.env.ENVIRONMENT === 'dev';
const logging = process.env.DEBUG_LOGGING === 'true';

exports.write = function(input) {
  // decide when to write to console or not
  if (isDev || logging) {
    return debug(input);
  }
};
