import React, { Component } from 'react';
import * as R from 'ramda'

export default class BattleshipCell extends Component {
  render() {
    const {attacks, clickFn, hideShips, x, y, ships} = this.props
    const onClick = clickFn ? clickFn.bind(null, x, y) : () => {}
    const cellHasShip = R.find(R.whereEq({x_pos:x, y_pos:y}), ships)
    const cellAttacked = R.find(R.whereEq({x_pos:x, y_pos:y}), attacks)
    const cellHit = cellHasShip && cellAttacked
    let bgColor = "#fff"
    if (cellHasShip) { bgColor = hideShips ? "#fff" : "blue" }
    if (cellAttacked) { bgColor = "orange" }
    if (cellHit) { bgColor = "red" }
    return <div onClick={onClick}
                style={{flexDirection: "column",
                        border: "1px solid teal",
                        width: 50,
                        height: 50,
                        backgroundColor: bgColor}} />
  }
}