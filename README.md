# Battleship.js
A battleship implementation built using a Node/Express web server and Redux/React client.

# Usage

Clone this repository and open both the client and the terminal.

### Server

Run `npm install`. Modify `knexfile.js`: update user to own username. Create a `battleship` database (`psql, CREATE DATABASE battleship;`). Run `knex migrate:latest` to run db migrations.

Run `npm run start`. Server will run at port 4000.

### Client

Run `npm install` or `yarn`. Run `npm run start`. Client will run at port 3000.

# Roadmap

- [ ] Deploy application

### Server
- [x] API Endpoints using semantically correct status codes and request methods (GET, POST, PUT, DELETE, etc)
    - [x] Create a game
    - [x] Destroy a game
    - [x] Accept coordinates for the player’s next move
    - [x] Return the coordinates for the CPU’s next move
- [ ] Refactor server/index.js (router, boot, etc.)
- [ ] Endpoint testing

### Client
- [x] 5x5 starting board
- [x] Player starts a game and places 10 ships on the board
- [x] Player submits their positions on the board via the API
- [x] CPU places its ships on the board
- [x] Player is given the first move and submits coordinates to strike
- [x] If a ship is hit, it is destroyed
- [x] Allow CPU to attack
- [x] Alternate moves between player and CPU
- [x] The first player to have all ships destroyed is the loser
- [x] List all previous games
    - [x] Can delete previous games
    - [x] Can load previous games to see placements/moves/winner
- [ ] Add user sessions so different users can track game history
- [ ] Add leaderboard to track and rank winners
- [ ] Component testing
- [ ] Unit testing
