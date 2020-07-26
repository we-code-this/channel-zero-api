require('dotenv').config();

const hosts = [
  process.env.DEV_HOST,
  process.env.EDGE_HOST,
  process.env.CLIENT_HOST,
  process.env.ADMIN_HOST,
];

const isValid = function (currentHost) {
  let valid = false;
  hosts.map(function (host) {
    if (currentHost === host) {
      valid = true;
    }
  });

  return valid;
};

exports.handler = function(event, context, callback) {
  if (isValid(event.headers.host)) {
    callback(null, {
      statusCode: 200,
      body: 'Hello, World!'
    });
  } else {
    callback(null, { statusCode: 404, body: 'That doesn’t exist' });
  }
};
