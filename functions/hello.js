const validHost = require('./utils/validHost');
const responses = require('./messages/responses');

exports.handler = function(event, context, callback) {
  if (validHost(event.headers.host)) {
    callback(null, {
      statusCode: 200,
      body: 'Hello, World!'
    });
  } else {
    callback(null, responses[404]);
  }
};
