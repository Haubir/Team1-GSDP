'use strict';

const express = require('express');
const WebSocket = require('ws').WebSocket;
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

var gws;
var rws;

wss.on('connection', (ws, req) => {
  ws.on('message', message => {
    //console.log(`New message: ${message}`);
    if (message === 'GUI client' || message === 'Robot') {

      if (message === 'GUI client') gws = ws;
      else if (identity === 'Robot') rws = ws;

      console.log('New connection detected, awaiting identity...');
      
      console.log(`${message} has connected`);
    }
    else if (message.startsWith('GUI:')) {
      console.log(`${message.split(':')[0]}: ${message.split(':')[1]}`);
      console.log('Passing on message..');
      gws.send(message.split(':')[1]);
    }
    else if (message.startsWith('Robot:')) {
      console.log(`${message.split(':')[0]}: ${message.split(':')[1]}`);
    }
  });
  ws.on('close', () => console.log(`${wss.clients[ws]} disconnected`));
});

// setInterval allows a function to run regularly with the interval netween the runs.
setInterval(() => {
  wss.clients.forEach((client) => {
    var msg = new Date().toTimeString();
    client.send('time:' + msg);
    //client.send(log);
  });
}, 1000);
