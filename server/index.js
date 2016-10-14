const express = require('express');
require('express-namespace');
const app = express();

const db_config = require('./knexfile');
const knex = require('knex')(db_config);

app.listen(3000, function() {
  console.log('Battleship server listening on port 3000...');

  app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
  });

  app.namespace('/api', function() {
    app.namespace('/games', function() {
      app.post('/new', function(req, res) {
        res.send("CREATE NEW GAME")
      });
      app.delete('/:id', function(req, res) {
        res.send("DELETE GAME")
      });
      app.put('/:id', function(req, res) {
        res.send("UPDATE GAME")
      });
    });
  });
});