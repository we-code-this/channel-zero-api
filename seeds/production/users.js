const fs = require('fs');

let adminUser, adminPass;
if (process.env.API_ADMIN_USER_FILE) {
  adminUser = fs
    .readFileSync(process.env.API_ADMIN_USER_FILE, 'utf8')
    .trim();
} else {
  adminUser = process.env.API_ADMIN_USER;
}

if (process.env.API_ADMIN_PASSWORD_FILE) {
  adminPass = fs
    .readFileSync(process.env.API_ADMIN_PASSWORD_FILE, 'utf8')
    .trim();
} else {
  adminPass = process.env.API_ADMIN_PASSWORD;
}

exports.seed = function(knex, Promise) {
  return knex('users')
    .select()
    .where({
      email: adminUser,
      username: 'admin',
    })
    .then(function(rows) {
      if (rows.length === 0) {
        return knex('users').insert({
          id: 1,
          email: adminUser,
          username: 'admin',
          password: adminPass,
          created_at: '2019-02-07 12:00:00',
        });
      }
    });
};
