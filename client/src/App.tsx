import * as React from 'react';
import { graphql, ChildDataProps } from 'react-apollo';
import gql from 'graphql-tag';
// import * as io from 'socket.io-client';
import './App.css';
import Game from './game';

type UsersQueryData = {
  users: [
    {
      id: string;
      name: string;
    }
  ];
};

export type AppProps = ChildDataProps<{}, UsersQueryData>;

class App extends React.Component<AppProps> {
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
    const { data: { loading, users } } = this.props;
    return (
      <div className="App">
        <p>{loading ? 'loading' : 'loaded'}</p>
        <p>{JSON.stringify(users)}</p>
        <div
          id="App-game"
          ref={(div: HTMLDivElement) => {
            this.gameDiv = div;
          }}
        />
        <div id="App-game-ui">
          <p>Darkve</p>
          <div className="ui-bottom">
            <div id="chat">
              <span>
                <span style={{ color: 'purple', fontWeight: 'bold' }}>
                  [SYSTEM]:{' '}
                </span>
                <span>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit
                  quidem perspiciatis id in quasi fugiat et? Vitae eos saepe,
                  nobis voluptates cupiditate molestiae esse ea consequatur
                  ullam dicta aliquam fugiat!
                </span>
                <span>
                  Nostrum, reiciendis distinctio dolore nobis vitae earum enim
                  blanditiis debitis dolor, amet veritatis sit ipsa a nihil
                  explicabo possimus deleniti beatae. Illum, fuga reiciendis!
                  Molestiae excepturi explicabo neque laboriosam ipsam?
                </span>
                <span>
                  Aliquid quis ab cumque qui nesciunt dolores beatae molestiae
                  dolore ex iure possimus, fugiat magni voluptatum ea porro
                  magnam recusandae ratione illo assumenda? Libero cupiditate
                  voluptas, ex ullam minima possimus!
                </span>
                <span>
                  Hic rerum commodi alias, suscipit distinctio, incidunt
                  doloremque quam magnam quidem minus nostrum eligendi eveniet
                  non velit molestias iste corrupti dignissimos saepe dolorum
                  laborum, mollitia debitis deserunt doloribus atque. Nostrum?
                </span>
                <span>
                  Eligendi debitis accusantium temporibus alias suscipit, ullam
                  magnam voluptatem animi delectus aliquam eius illum ipsa ut,
                  nobis iste voluptate, unde aut ea perferendis veritatis modi
                  quia harum! Iste, quia aspernatur.
                </span>
              </span>
            </div>
            <div id="buttons">
              <button onClick={() => alert('hey')}>Settings</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default graphql(gql`
  query users {
    users {
      id
      name
    }
  }
`)(App);
