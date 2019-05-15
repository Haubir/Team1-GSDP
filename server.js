const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');


const port = process.env.PORT || 8080;
const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname ));
app.use(express.static(path.join(__dirname, '/build')));
app.get('/ping', function (req, res) {
 return res.send('pong');
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/build', 'index.html'));
});

const server = http.Server(app);
server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

const io = socketIO(server)
const sockets = [];
io.on('connection', function (socket) {

  socket.broadcast.emit('add-users', {
    users: [socket.id]
  });

  socket.on('make-offer', function (data) {
    console.log("maker offer")
    // socket.emit('offer-made', {
    //   offer: data.offer,
    //   socket: socket.id
    // });
    socket.broadcast.emit('offer-made', {
      offer: data.offer,
      socket: socket.id
    });
  });

  socket.on('make-answer', function (data) {
    console.log("answer")
    // socket.emit('answer-made', {
    //   socket: socket.id,
    //   answer: data.answer
    // });

    socket.broadcast.emit('answer-made', {
      socket: socket.id,
      answer: data.answer
    });
  });

  socket.on('disconnect', function () {
    sockets.splice(sockets.indexOf(socket.id), 1);
    io.emit('remove-user', socket.id);
  });

  sockets.push(socket.id);
});

process.on('uncaughtException', (err) => {
  shutdown('Uncaught excecption occurred', err);
});

function shutdown(message, err) {
  console.log(`${message}: gracefully shutting down...`);
  console.error(err);
  process.exit(1);
}