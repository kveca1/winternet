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
    socket.emit('isHost', true);
    console.log("isHost = true");
  }
  else
  {
    console.log("isHost = false");
    socket.emit('isHost', false);
  }

  players.push(
  {
    name: data,
    socket: socket
  });
  console.log("addPlayer " + data);
  });

  socket.on('connected', () => {
    console.log('connected');
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
    if(players[0].socket === socket)
    {
      console.log("Host " + players[0].name + " is leaving");
      players.shift();
      if(players.length > 1)
      {
        players[0].socket.emit('isHost', true);
        console.log("New host is " + players[0].name)
      }
    }
    else
    {
      console.log("Player " + players[0].name + " is leaving");
      for(var i = 0; i < players.length; i++)
        if(player[i].socket == socket)
          players.splice(i,1);
    }
  });

  /*socket.on('ballSet', function(data) {
	socket.broadcast.emit('ballSet', data);
  console.log("ballSet " + data)
  });

  socket.on('score', function(data) {
	socket.broadcast.emit('score', data);
  console.log("score " + data)
  });
  */
});
