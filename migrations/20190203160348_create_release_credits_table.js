exports.up = function (knex, Promise) {
  return knex.schema.createTable('release_credits', function (table) {
    table.increments()
    table
      .integer('release_id')
      .unsigned()
      .notNullable()
    table.string('label').notNullable()
    table.string('value').notNullable()
    table.string('url').nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').nullable()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('release_credits')
}
