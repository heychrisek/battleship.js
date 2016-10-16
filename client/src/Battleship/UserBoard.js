import React, { Component } from 'react';
import BattleshipGrid from './Grid'

export default class UserBoard extends Component {
  render() {
    const {attacks, className, clickFn, score, ships, user} = this.props;
    return (
      <div style={{display:"flex", flexDirection:"row"}} className={className}>
        <BattleshipGrid clickFn={clickFn}
                        ships={ships}
                        attacks={attacks}
                        hideShips={user === "CPU"} />
        <div style={{display:"flex", flexDirection:"column", textAlign:"left"}}>
          <strong>{user}</strong>
          <strong>Hits: {score}</strong>
        </div>
      </div>
    );
  }
}