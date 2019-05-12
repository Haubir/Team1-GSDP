'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'public/pages/client.html');

// ugly fugly below
/*
var log = [];
log["hello"] = "world";
*/
// ugly fugly ends here

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`We are listening on ${ PORT }`));

const wss = new SocketServer({ server });


wss.on('connection', (ws) => {
  ws.on('message', message => {
    //console.log(`New message: ${message}`);
    if (message === 'GUI client' || message === 'Robot') {
      console.log('New connection detected, awaiting identity...');
      wss.clients[ws] = message;
      console.log(`${wss.clients[ws]} has connected`);
    }
    else {
      console.log(`${wss.clients[ws]}: ${message}`);
      console.log(wss.clients.has('Robot'));
      if (wss.clients.has('Robot')) {
        rws = wss.clients['Robot'];
        console.log(wss.clients['Robot']);
        rws.send(message);
      }
    }
  });
  ws.on('close', () => console.log(`${wss.clients[ws]} disconnected`));
});

// setInterval allows a function to run regularly with the interval netween the runs.
setInterval(() => {
  wss.clients.forEach((client) => {
    var msg = 'time:' + new Date().toTimeString();
    client.send(msg);
    //client.send(log);
  });
}, 1000);
