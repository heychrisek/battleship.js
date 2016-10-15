import React, { Component } from 'react';
import BattleshipGrid from './Grid'

export default class UserBoard extends Component {
  render() {
    const {attacks, clickFn, ships, user} = this.props;
    return (
      <div style={{display:"flex", flexDirection:"row"}}>
        <BattleshipGrid clickFn={clickFn}
                        ships={ships}
                        attacks={attacks}
                        hideShips={user === "CPU"} />
        <h6>{user}</h6>
      </div>
    );
  }
}