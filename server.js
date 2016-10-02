const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server listening at port', port);
});

app.use(express.static(__dirname));

let players = [];
var host;

io.on('connection', socket => {
  //socket.on('mouse move', (data) => {
  //  console.log(data);
  //});
  socket.on('addPlayer', function(data) {
	if(players.length == 0)
	{
		host = data;
		socket.emit('isHost');
    console.log("addPlayer " + data);
	}
	playersA.push(data);
  });
  socket.on('connected', () => {
    console.log('connected');
  });
  socket.on('disconnect', () => {
    console.log('disconnected');

  });
  socket.on('ballSet', function(data) {
	socket.broadcast.emit('ballSet', data);
  console.log("ballSet " + data)
  });
  socket.on('score', function(data) {
	socket.broadcast.emit('score', data);
  console.log("score " + data)
  });
});
