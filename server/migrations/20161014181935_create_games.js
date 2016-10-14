exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', function(t){
    t.increments('id').notNullable();
    t.boolean('completed');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('games');
};
