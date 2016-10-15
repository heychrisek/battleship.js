exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(t) {
      t.increments('id').notNullable();
      t.string('name');
      t.timestamps();
    }),
    knex.schema.table('placements', function(t) {
      t.renameColumn('player_number', 'user_id');
    }),
    knex.schema.table('moves', function(t) {
      t.renameColumn('player_number', 'user_id');
    }),
    knex.schema.table('games', function(t) {
      t.integer('user_id').references('id').inTable('users');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('games', function(t) {
      t.dropColumn('user_id')
    }),
    knex.schema.table('moves', function(t) {
      t.renameColumn('user_id', 'player_number')
    }),
    knex.schema.table('placements', function(t) {
      t.renameColumn('user_id', 'player_number')
    }),
    knex.schema.dropTable('users')
  ]);
};
