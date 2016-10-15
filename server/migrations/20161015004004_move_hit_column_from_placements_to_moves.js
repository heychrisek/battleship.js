exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('placements', function(t) {
      t.dropColumn('hit');
    }),
    knex.schema.table('moves', function(t) {
      t.boolean('hit');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('moves', function(t) {
      t.dropColumn('hit');
    }),
    knex.schema.table('placements', function(t) {
      t.boolean('hit');
    })
  ]);  
};