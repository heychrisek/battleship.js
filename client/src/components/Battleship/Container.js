import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gamesActions from '../../actions/games-actions'; 
import moment from 'moment'
import UserBoard from './UserBoard'
import {filterByUser, filterHits} from '../../helpers';
import * as R from 'ramda';
import '../../styles/Battleship.css';
import '../../styles/Button.css';

const NUM_SHIPS = 10;

const gameOverPrompt = function(winner, newGameFn) {
  const restart = confirm(`Game over. ${winner} won. Play again?`);
  if (restart) { return newGameFn(); };
};

class BattleshipContainer extends Component {
  componentDidMount() {
    this.props.actions.fetchGames();
  }

  render() {
    const { actions, allGames, cpuAttacks, cpuHits, cpuShips, inProgressGame,
            userAttacks, userHits, userShips } = this.props;
    const {handleAttack, handleDeleteGame, handleLoadGame, handlePlacement, initiateGame} = actions;

    const userScore = userHits.length;
    const cpuScore = cpuHits.length;
    const userWins = userScore === NUM_SHIPS;
    const cpuWins = cpuScore === NUM_SHIPS;
    const gameOver = cpuWins || userWins;
    const winner = cpuWins ? "CPU" : "User";

    const mode = userShips.length < NUM_SHIPS ? 'placing' : 'attacking';

    const attack = handleAttack.bind(null, inProgressGame);
    let attackFn = mode === 'attacking'
      ? attack
      : function() { alert(`Place all ${NUM_SHIPS} of your ships on the lower board first.`); };
    let placeFn = mode === 'placing'
      ? handlePlacement.bind(null, inProgressGame)
      : function() { alert('No more ships to place. Attack the upper board!'); };
    if (gameOver) {
      placeFn = gameOverPrompt.bind(null, winner, initiateGame);
      attackFn = gameOverPrompt.bind(null, winner, initiateGame);
    };

    let transcriptText;
    if (inProgressGame && mode === 'placing') { transcriptText = <p>Place all {NUM_SHIPS} ships on the lower board.</p>}
    if (inProgressGame && mode === 'attacking' && userAttacks.length === 0) {
      transcriptText = <p>Attack the upper board.</p>
    }
    if (inProgressGame && userAttacks.length > 0) {
      transcriptText =
        <p>
          User attacks {R.last(userAttacks).x_pos + 1}, {R.last(userAttacks).y_pos + 1}.&nbsp;
          {R.last(userAttacks).hit ? "Hit! " : "Miss. "}
          <br/>
          CPU attacks {R.last(cpuAttacks).x_pos + 1}, {R.last(cpuAttacks).y_pos + 1}.&nbsp;
          {R.last(cpuAttacks).hit ? "Hit! " : "Miss. "}
        </p>
    }
    if (gameOver) { transcriptText = `Game over. ${winner} wins!`}

    return (
      <div className="BattleshipContainer">
        <div style={{display:"flex", flexDirection:"row"}}>
          <div style={{display:"flex", flexDirection:"column"}}>
            <h4>Previous Games</h4>
            <div className="Battleship-previousGames">
              <div className="Battleship-previousGame">
                <strong className="Battleship-buttonCell"></strong>
                <strong className="Battleship-idCell">Game</strong>
                <strong className="Battleship-dateCell">Date</strong>
                <strong className="Battleship-winnerCell">Winner</strong>
              </div>
              {R.map(function(game) {
                return <div key={game.id} className="Battleship-previousGame">
                  <span>
                    <button className="Button Button-delete" onClick={handleDeleteGame.bind(null, game.id)}>Delete</button>
                  </span>
                  <span>
                    <button className="Button" onClick={handleLoadGame.bind(null, game.id)}>Load</button>
                  </span>
                  <span className="Battleship-idCell">
                    {game.id}
                  </span>
                  <span className="Battleship-dateCell">
                    {moment(game.created_at).format('L')}
                  </span>
                  <span className="Battleship-winnerCell">
                    {game.winner_id === null ? "N/A" : null}
                    {game.winner_id === 1 ? "CPU" : null}
                    {game.winner_id === 2 ? "User" : null}
                  </span>
                </div>;
              }, R.reverse(R.sortBy(R.prop('id'), allGames)))}
            </div>
          </div>
          <div style={{display:"flex", flexDirection:"column", width:"100%", alignItems:"center"}}>
            <button style={{width: 150}} className="Button" onClick={initiateGame}>Start New Game</button>
            {inProgressGame != null
              ? <div className={mode}>
                  <p>Game #{inProgressGame}</p>
                  <UserBoard clickFn={attackFn}
                             attacks={userAttacks}
                             ships={cpuShips}
                             user={"CPU"}
                             score={cpuScore}
                             className="UserBoard-cpu" />
                  &nbsp;
                  <UserBoard clickFn={placeFn}
                             attacks={cpuAttacks}
                             ships={userShips}
                             user="User"
                             score={userScore}
                             className="UserBoard-user" />
                </div>
              : null}
            {inProgressGame
              ? <div className="Battleship-transcript">
                  <div className="Battleship-transcriptContent">
                    {transcriptText}
                  </div>
                </div>
              : null}
          </div>
        </div>
      </div>
    );
  };
};

function mapStateToProps(state, props) {
  const {allGames, attackPlacements, inProgressGame, shipPlacements} = state.games;
  const userAttacks = filterByUser(2, attackPlacements);
  const cpuAttacks = filterByUser(1, attackPlacements);
  return {
    inProgressGame: inProgressGame,
    allGames: allGames,
    userShips: filterByUser(2, shipPlacements),
    userAttacks: userAttacks,
    userHits: filterHits(userAttacks),
    cpuShips: filterByUser(1, shipPlacements),
    cpuAttacks: cpuAttacks,
    cpuHits: filterHits(cpuAttacks)
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(gamesActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BattleshipContainer); 