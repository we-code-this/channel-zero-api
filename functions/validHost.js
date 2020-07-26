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

module.exports = function(host) {
  return isValid(host);
};
