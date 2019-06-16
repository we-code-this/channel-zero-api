
exports.up = function(knex, Promise) {
    return knex.schema.createTable("users", function(table) {
        table.increments();
        table.string("email").notNullable();
        table.string("username").notNullable();
        table.string("password").notNullable();
        table.string("first_name").nullable();
        table.string("last_name").nullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").nullable();
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("users");
};
