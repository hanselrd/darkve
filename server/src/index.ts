// import WebSocket from 'ws';

// const wss = new WebSocket.Server({ port: 4000 });

// wss.on('connection', ws => {
//   ws.on('message', message => {
//     console.log('Received: %s', message);
//   });

//   ws.send('something');
// });

import { sum } from 'darkve-common';

console.log(process.env.DATABASE_URL);
console.log(sum(2, 2));
