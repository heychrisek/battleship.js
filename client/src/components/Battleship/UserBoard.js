import React, { Component } from 'react';
import BattleshipGrid from './Grid'
import '../../styles/UserBoard.css';

export default class UserBoard extends Component {
  render() {
    const {attacks, className, clickFn, score, ships, user} = this.props;
    return (
      <div style={{display:"flex", flexDirection:"row"}} className={className}>
        <BattleshipGrid clickFn={clickFn}
                        ships={ships}
                        attacks={attacks}
                        hideShips={user === "CPU"} />
        <div className="UserBoard-scores">
          <strong>{user}</strong>
          <strong>Hits: {score}</strong>
        </div>
      </div>
    );
  }
}