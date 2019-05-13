const express = require('express');
const favicon = require('express-favicon');
const SocketServer = require('ws').Server;
const path = require('path');
const port = process.env.PORT || 8080;
const server = express();
server.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
server.use(express.static(__dirname));
server.use(express.static(path.join(__dirname, 'build')));

server.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
server.listen(port);
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