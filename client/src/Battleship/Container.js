import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gamesActions from '../actions/games-actions'; 
import * as R from 'ramda'
import UserBoard from './UserBoard'

class BattleshipContainer extends Component {
  render() {
    const {actions, cpuAttacks, cpuHits, cpuShips, inProgressGame, userAttacks, userHits, userShips} = this.props
    const {handleAttack, handlePlacement, initiateGame} = actions

    const attack = handleAttack.bind(null, inProgressGame)
    const attackFn = userShips.length < 5
      ? function() { alert("Place all five of your ships first."); }
      : attack
    const placeFn = userShips.length >= 5
      ? function() { alert("No more ships to place. Attack!"); }
      : handlePlacement.bind(null, inProgressGame)
    
    const gameOver = cpuHits.length === 5 || userHits.length === 5
    console.warn("cpuHits", cpuHits)
    console.warn("userHits", userHits)
    return (
      <div className="BattleshipContainer">
        <button onClick={initiateGame}>Start New Game</button>
        <span>Game #{inProgressGame}</span>
        {inProgressGame != null
          ? <div style={{display:"flex", flexDirection:"column"}}>
              <UserBoard clickFn={attackFn} attacks={userAttacks} ships={cpuShips} isOpponent={true} user={"CPU"} />
              &nbsp;
              <UserBoard clickFn={placeFn} attacks={cpuAttacks} ships={userShips} isOpponent={false} user="You" />
            </div>
          : null}
        {gameOver ? <div>GAME OVER</div> : <div>GAME IN PROGRESS</div>}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const {allGames, attackPlacements, inProgressGame, shipPlacements, } = state.games
  const userAttacks = R.filter(function(ap){ return ap.user_id === 2 }, attackPlacements)
  const cpuAttacks = R.filter(function(ap){ return ap.user_id === 1 }, attackPlacements)
  return {
    inProgressGame: inProgressGame,
    allGames: allGames,
    userShips: R.filter(function(sp){ return sp.user_id === 2 }, shipPlacements),
    userAttacks: userAttacks,
    userHits: R.filter(function(ua){ return ua.hit }, userAttacks),
    cpuShips: R.filter(function(sp){ return sp.user_id === 1 }, shipPlacements),
    cpuAttacks: cpuAttacks,
    cpuHits: R.filter(function(ca){ return ca.hit }, cpuAttacks),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(gamesActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BattleshipContainer); 