const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server listening at port', port);
});

app.use(express.static(__dirname));

let players = 0;

io.on('connection', socket => {
  socket.on('mouse move', (data) => {
    console.log(data);
  });
  socket.on('connected', () => {
    console.log('connected');
  });
  socket.on('disconnected', () => {
    console.log('disconnected');
  });
  socket.on('ballSetX', function(data) {
	socket.broadcast.emit('ballSetX', data);
  });
  socket.on('ballSetY', function(data) {
	socket.broadcast.emit('ballSetY', data);
  });
  socket.on('ballSetVX', function(data) {
	socket.broadcast.emit('ballSetVX', data);
  });
  socket.on('ballSetVy', function(data) {
	socket.broadcast.emit('ballSetVY', data);
  });
  socket.on('ballChangeVX', function(data) {
	socket.broadcast.emit('ballChangeVX',data);
  });
  socket.on('ballChangeVY', function(data) {
	socket.broadcast.emit('ballChangeVY',data);
  });
});
