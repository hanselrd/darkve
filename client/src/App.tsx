import * as React from 'react';
import './App.css';
import Game from './game';

class App extends React.Component {
  gameDiv: HTMLDivElement;
  game: Game;

  componentDidMount() {
    this.game = new Game(this.gameDiv);
  }

  componentWillUnmount() {
    this.game.destroy();
  }

  render() {
    return (
      <div className="App">
        <div
          id="App-game"
          ref={(div: HTMLDivElement) => {
            this.gameDiv = div;
          }}
        />
      </div>
    );
  }
}

export default App;
