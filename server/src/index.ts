import express from 'express';
import path from 'path';
import socket from 'socket.io';
import { PacketHandler, PacketType } from 'darkve-common';

const port = process.env.PORT || 4000;

const app = express();

app.use(express.static(path.join(__dirname, '../../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

const server = app.listen(port, () => {
  console.log('Server started on port 4000');
});

const io = socket(server);

io.on('connection', socket => {
  console.log(socket.id, 'connected');

  const ph = new PacketHandler<string>(socket);

  // socket.emit('darkve', { message: 'Hey' });
  ph.send({ type: PacketType.ACTION, token: socket.id, data: 'Hey' });

  // socket.on('darkve', data => {
  //   console.log(data.message);
  // });
  ph.onrecv(packet => {
    console.log(packet.data);
  });

  socket.on('disconnect', () => {
    console.log(socket.id, 'disconnected');
  });
});
