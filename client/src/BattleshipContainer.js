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
                const bgColor = isPlaced ? "blue" : "white"
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
    return (
      <div className="BattleshipContainer">
        <button onClick={this.props.actions.initiateGame}>Start New Game</button>
        <span>Game #{this.props.inProgressGame}</span>
        {this.props.inProgressGame != null
          ? <div style={{display:"flex", flexDirection:"column"}}>
              <BattleshipGrid size={50} /> (cpu board)
              &nbsp;
              <BattleshipGrid size={50}
                              placeFn={this.props.actions.initiatePlacement.bind(null, this.props.inProgressGame)}
                              placements={this.props.shipPlacements} />
                              (your board)
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
    shipPlacements: state.games.shipPlacements
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(gamesActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BattleshipContainer); 