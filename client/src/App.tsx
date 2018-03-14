import * as React from 'react';
import './App.css';

// import * as io from 'socket.io-client';

import Game from './game';

class App extends React.Component {
  gameDiv: HTMLDivElement;
  game: Game;
  // socket: SocketIOClient.Socket;

  componentDidMount() {
    this.game = new Game(this.gameDiv);
    // this.socket = io('http://localhost:4000');
    // this.socket.on('connect', () => {
    //   console.log('Connected:', this.socket.id);
    //   this.socket.on('player-connect', ({ msg }: any) => {
    //     console.log(msg);
    //   });
    //   this.socket.on('player-disconnect', ({ msg }: any) => {
    //     console.log(msg);
    //   });
    // });
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
