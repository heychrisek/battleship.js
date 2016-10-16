const express = require('express');
require('express-namespace');

const NUM_SHIPS = 10;

const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json());

// handle CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const db_config = require('./knexfile');
const knex = require('knex')(db_config);

app.listen(4000, function() {
  console.log('Battleship server listening on port 4000...');

  app.get('/', function(req, res) {
    res.sendFile(__dirname + '/../client/build/index.html');
  });

  app.namespace('/api', function() {
    app.namespace('/games', function() {
      // GET all games
      app.get('/', function(req, res) {
        knex('games')
        .then(function(games) {
          res.send(games);
        })
      });
      // CREATE new game
      app.post('/new', function(req, res) {
        knex('games').insert({completed: false, created_at: new Date()}, 'id')
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
        const {x_pos, y_pos, user_id} = req.body;
        const game_id = req.params.id;
        knex('placements').insert({
          game_id: game_id,
          x_pos, y_pos, user_id
        }, 'id')
        .then(function(id) {
          res.send({game_id, x_pos, y_pos, user_id, id: id[0]});
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
          return knex('placements').whereNot('user_id', user_id).andWhere('game_id', game_id).andWhere('x_pos', x_pos).andWhere('y_pos', y_pos)
          .then(function(hits) {
            const hit = hits.length > 0
            knex('moves').where('id', Number(id)).update('hit', hit)
            .then(function() {
              knex('moves').whereNot('user_id', user_id).andWhere('game_id', game_id).andWhere('hit', true)
              .then(function(allUserHits) {
                const complete = allUserHits.length === NUM_SHIPS
                const winner = complete ? user_id : null
                knex('games').where('id', game_id).update({'completed': complete, "winner_id": winner})
                .then(function() {
                  res.send({game_id, x_pos, y_pos, user_id, id: id[0], hit});
                })
              })
            })
          })
        })
      });
    });
  });
});