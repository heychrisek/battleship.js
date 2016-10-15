import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gamesActions from './actions/games-actions'; 
import * as R from 'ramda'

class BattleshipGrid extends Component {
  render() {
    const {placements = [], size} = this.props
    const xyPairs = R.zip(R.pluck('x_pos', placements), R.pluck('y_pos', placements))
    const clickHandler = this.props.placeFn ? this.props.placeFn : this.props.attackFn
    return (
      <div style={{display:'flex'}}>
        {R.times(function(i) {
          return (
            <div key={`row${i}`} style={{flexDirection:"row"}}>
              {R.times(function(n) {
                const onClick = clickHandler ? clickHandler.bind(null, i, n) : () => {}
                const isPlaced = R.any(R.equals([i, n]), xyPairs)
                const isHit = isPlaced && R.last(placements).hit
                let bgColor = isPlaced ? "#ADD8E6" : "white"
                if (isHit) { bgColor = "red" }
                return <div key={`col${n}`}
                            onClick={onClick}
                            style={{flexDirection: "column",
                                    border: "1px solid teal",
                                    width: size,
                                    height: size,
                                    backgroundColor: bgColor}} />
              }, 5)}
            </div>
          )
        }, 5)}
      </div>
    )
  }
}

class BattleshipContainer extends Component {
  render() {
    const attack = this.props.actions.initiateAttack.bind(null, this.props.inProgressGame)
    const attackFn = this.props.shipPlacements.length < 5
      ? function() { alert("Place all five of your ships first."); }
      : attack
    const placeFn = this.props.shipPlacements.length >= 5
      ? function() { alert("No more ships to place. Attack!"); }
      : this.props.actions.handlePlacement.bind(null, this.props.inProgressGame)
    return (
      <div className="BattleshipContainer">
        <button onClick={this.props.actions.initiateGame}>Start New Game</button>
        <span>Game #{this.props.inProgressGame}</span>
        {this.props.inProgressGame != null
          ? <div style={{display:"flex", flexDirection:"column"}}>
              <div style={{display:"flex", flexDirection:"row"}}>
                <BattleshipGrid size={50}
                                attackFn={attackFn}
                                placements={this.props.attackPlacements} />
                <h6>CPU</h6>
              </div>
              &nbsp;
              <div style={{display:"flex", flexDirection:"row"}}>
                <BattleshipGrid size={50}
                                placeFn={placeFn}
                                placements={this.props.shipPlacements} />
                <h6>You</h6>
              </div>
            </div>
          : null}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    inProgressGame: state.games.inProgressGame,
    allGames: state.games.allGames,
    shipPlacements: R.filter(function(sp){ return sp.user_id === 2 }, state.games.shipPlacements),
    attackPlacements: state.games.attackPlacements
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(gamesActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BattleshipContainer); 