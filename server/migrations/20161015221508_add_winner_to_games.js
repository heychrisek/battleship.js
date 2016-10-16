
exports.up = function(knex, Promise) {
  return knex.schema.table('games', function(t) {
    t.integer('winner_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('games', function(t) {
    t.dropColumn('winner_id');
  });  
};