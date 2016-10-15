import React, { Component } from 'react';
import BattleshipContainer from './Battleship/Container'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        Welcome to Battleship
        <BattleshipContainer />
      </div>
    );
  }
}

export default App;
