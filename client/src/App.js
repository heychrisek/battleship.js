import React, { Component } from 'react';
import BattleshipContainer from './BattleshipContainer'
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
