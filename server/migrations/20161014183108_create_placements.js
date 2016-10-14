exports.up = function(knex, Promise) {
  return knex.schema.createTable('placements', function(t){
    t.increments('id').notNullable();
    t.integer("game_id").references('id').inTable('games').notNullable();
    t.integer("x_pos");
    t.integer("y_pos");
    t.integer("player_number");
    t.boolean("hit").defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('placements');
};
