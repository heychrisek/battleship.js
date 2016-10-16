import React, { Component } from 'react';
import {cellOverlaps} from '../helpers';
import battleshipImg from '../../public/battleship.gif';
import targetImg from '../../public/target.png';
import '../Battleship.css';

export default class BattleshipCell extends Component {
  render() {
    const {attacks, clickFn, hideShips, x, y, ships} = this.props;

    const onClick = clickFn ? clickFn.bind(null, x, y) : () => {};

    const cellHasShip = cellOverlaps(x, y, ships);
    const cellAttacked = cellOverlaps(x, y, attacks);
    const cellHit = cellHasShip && cellAttacked;

    let bgColor, innerContent;
    if (cellHasShip) {
      innerContent = hideShips
        ? null
        : <img src={battleshipImg}
               role="presentation"
               style={{width:50, paddingTop:3}} />;
    };
    if (cellAttacked) {
      innerContent = <img src={targetImg}
                          role="presentation"
                          style={{width:30, paddingTop:10}}/>;
      bgColor = '#BFEFFF';
    };
    if (cellHit) {
      innerContent =
        <div>
          <img src={targetImg}
               role="presentation"
               style={{width:30, position:"absolute"}}/>
          <img src={battleshipImg}
               role="presentation"
               style={{width:50, paddingTop:3}} />
        </div>;
      bgColor = '#CD5C5C';
    };
    return <div onClick={onClick}
                className="BattleshipCell"
                style={{flexDirection: "column",
                        border: "1px solid teal",
                        width: 50,
                        height: 50,
                        backgroundColor: bgColor}}>{innerContent}</div>;
  };
};