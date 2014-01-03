
var defaults = require('defaults');
var extend = require('extend');
var onResponse = require('on-response');

/**
 * Expose `generate`.
 */

module.exports = generate;

/**
 * Generate a request error logging middleware.
 *
 * @param {Logger} logger
 * @param {Object} levels
 * @return {Function}
 */

function generate (logger, levels) {
  if (!logger.error) throw new Error('Logger must be provided.');

  levels = defaults(levels, {
    404: logger.warn,
    '*': logger.error
  });

  return function errorLog (err, req, res, next) {
    onResponse(req, res, function (summaryErr, summary) {
      var status = err.status || summary.response.status || 500;
      var log = levels[status] || levels['*'];
      extend(summary.request, { body: req.body });
      extend(summary, { msg: err.toString() });
      if (status !== 404) extend(summary, { stack: err.stack });
      var msg = format(err, summary);
      log.bind(logger)(msg, summary);
    });

    next(err);
  };
}

/**
 * Formats the request error log message.
 *
 * @param {Error} err
 * @param {Object} summary
 * @return {String}
 */

function format (err, summary) {
  var request = summary.request;
  var response = summary.response;
  var stack = summary.stack.replace(/\\n/g, '\n');
  return err.toString() + ' - request failed (' + response.status + ') ' +
   request.method + ' ' + request.url + ' ' + response.time + 'ms' + '\n' + stack;
}