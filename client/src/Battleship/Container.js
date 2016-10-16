import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gamesActions from '../actions/games-actions'; 
import UserBoard from './UserBoard'
import {filterByUser, filterHits} from '../helpers';
import '../Battleship.css';

const NUM_SHIPS = 10;

const gameOverPrompt = function(winner, newGameFn) {
  const restart = confirm(`Game over. ${winner} won. Play again?`);
  if (restart) { return newGameFn(); };
};

class BattleshipContainer extends Component {
  render() {
    const {actions, cpuAttacks, cpuHits, cpuShips, inProgressGame, userAttacks, userHits, userShips} = this.props;
    const {handleAttack, handlePlacement, initiateGame} = actions;

    const userScore = userHits.length;
    const cpuScore = cpuHits.length;
    const userWins = userScore === NUM_SHIPS;
    const cpuWins = cpuScore === NUM_SHIPS;
    const gameOver = cpuWins || userWins;
    const winner = cpuWins ? "CPU" : "You";

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

    return (
      <div className="BattleshipContainer">
        <button onClick={initiateGame}>Start New Game</button>
        {inProgressGame ? <p>Game #{inProgressGame}</p> : null}
        {inProgressGame != null
          ? <div style={{display:"flex", flexDirection:"column"}} className={mode}>
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
                         user="You"
                         score={userScore}
                         className="UserBoard-user" />
              {gameOver ? <div>Game Over. {cpuWins ? "CPU wins." : "You win!"}</div> : <div>GAME IN PROGRESS</div>}
            </div>
          : null}
      </div>
    );
  };
};

function mapStateToProps(state, props) {
  const {allGames, attackPlacements, inProgressGame, shipPlacements, } = state.games;
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