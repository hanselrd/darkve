import * as React from 'react';
import './App.css';
// import Chat from './Chat';
import Game from './Game';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        {/* <p>Darkve</p> */}
        {/* <Chat /> */}
        <Game />
      </div>
    );
  }
}

export default App;
