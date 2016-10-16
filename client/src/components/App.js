import React, { Component } from 'react';
import BattleshipContainer from './Battleship/Container';

class App extends Component {
  render() {
    return (
      <div>
        <div style={{textAlign: "center"}}>
          <p>
            Welcome to Battleship.js, a modified implementation of Battleship built with a Node.js/Express web server and a
            Redux/React client. The <a href="https://github.com/heychrisek/battleship.js">full source code is on Github</a>.
          </p>
        </div>
        <BattleshipContainer />
      </div>
    );
  }
}

export default App;
