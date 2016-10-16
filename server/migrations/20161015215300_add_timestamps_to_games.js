
exports.up = function(knex, Promise) {
  return knex.schema.table('games', function(t) {
    t.dateTime('created_at');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('games', function(t) {
    t.dropColumn('created_at');
  });  
};