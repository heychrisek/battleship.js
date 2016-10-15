const express = require('express');
require('express-namespace');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json());

const db_config = require('./knexfile');
const knex = require('knex')(db_config);

app.listen(4000, function() {
  console.log('Battleship server listening on port 4000...');

  app.get('/', function(req, res) {
    res.sendFile(__dirname + '/../client/build/index.html');
  });

  app.namespace('/api', function() {
    app.namespace('/games', function() {
      // CREATE new game
      app.post('/new', function(req, res) {
        knex('games').insert({completed: false}, 'id')
        .then(function(id) {
          res.send({id: id[0]});
        });
      });
      // DELETE game
      app.delete('/:id', function(req, res) {
        const id = req.params.id
        knex('games').where('id', id).delete()
        .then(function() {
          res.send({id});
        });
      });
      // POST placements
      app.post('/:id/placement', function(req, res) {
        const {x_pos, y_pos, user_id} = req.body
        const game_id = req.params.id
        knex('placements').insert({
          game_id: game_id,
          x_pos, y_pos, user_id
        }, ['id'])
        .then(function(id) {
          res.send({game_id, x_pos, y_pos, placement_id: id[0]});
        })
      });
      // POST moves
      app.post('/:id/moves', function(req, res) {
        const {x_pos, y_pos, user_id} = req.body;
        const game_id = req.params.id;
        knex('moves').insert({
          game_id: game_id,
          x_pos, y_pos, user_id
        }, 'id')
        .then(function(id) {
          res.send({game_id, placement_id: id[0]});
        })
      });
    });
  });
});