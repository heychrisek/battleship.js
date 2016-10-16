import React, { Component } from 'react';
import BattleshipContainer from './Battleship/Container'
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>
          Welcome to Battleship.js, a modified implementation of Battleship built with a Node.js/Express
          web server and a Redux/React client. The <a href="">full source code is on Github</a>.
        </p>
        <p>Press the button below to begin.</p>
        <BattleshipContainer />
      </div>
    );
  }
}

export default App;
