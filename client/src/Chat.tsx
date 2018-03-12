import * as React from 'react';
import * as io from 'socket.io-client';
import { PacketHandler, PacketType, SocketType } from 'darkve-common';

// interface Data {
//   message: string;
// }

class Chat extends React.Component {
  socket: SocketIOClient.Socket;
  ph: PacketHandler<string>;

  componentWillMount() {
    this.socket = io('http://localhost:4000');
    this.ph = new PacketHandler(this.socket, SocketType.CLIENT);
    this.socket.on('connect', () => {
      console.log('Connected', `my id is ${this.socket.id}`);

      // this.socket.on('darkve', (data: Data) => {
      //   console.log(data.message);
      // });
      this.ph.onrecv(packet => {
        console.log(packet);
      });
    });
  }

  onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // this.socket.emit('darkve', { message: 'yeH' });
    this.ph.send({
      type: PacketType.ACTION,
      token: this.socket.id,
      data: 'yeH'
    });
  };

  render() {
    return (
      <div className="Chat">
        <button onClick={this.onClick}>Click Me!</button>
      </div>
    );
  }
}

export default Chat;
