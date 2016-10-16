import React, { Component } from 'react';
import * as R from 'ramda';
import BattleshipCell from './Cell';

export default class BattleshipGrid extends Component {
  render() {
    const {attacks = [], ships = [], clickFn, hideShips} = this.props;
    return (
      <div style={{display:'flex'}}>
        {R.times(function(x) {
          return (
            <div key={`row${x}`} style={{flexDirection:"row"}}>
              {R.times(function(y) {
                return <BattleshipCell key={`col${y}`}
                                       x={x}
                                       y={y}
                                       ships={ships}
                                       attacks={attacks}
                                       clickFn={clickFn}
                                       hideShips={hideShips} />
              }, 5)}
            </div>
          )
        }, 5)}
      </div>
    );
  }
}