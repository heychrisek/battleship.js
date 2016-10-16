
exports.up = function(knex, Promise) {
  return Promise.all([
    knex('users').insert({name: 'cpu'}, '*'),
    knex('users').insert({name: 'user'}, '*')
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex('users').where({name: 'cpu'}).delete(),
    knex('users').where({name: 'user'}).delete()
  ])  
};
