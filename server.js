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
let score = [0,0]

io.on('connection', socket => {
  //socket.on('mouse move', (data) => {
  //  console.log(data);
  //});
  socket.on('addPlayer', function(data) {
	if(players.length == 0)
	{
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
  socket.emit('score', score);
  });

  socket.on('connected', () => {
    console.log('connected');
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
    if(players.length > 0)
    {
      if(players[0].socket === socket)
      {
        console.log("Host " + players[0].name + " is leaving");
        players.shift();
        if(players.length > 0)
        {
          players[0].socket.emit('isHost', true);
          console.log("New host is " + players[0].name)
        }
      }
      else
      {
        console.log("Player " + players[0].name + " is leaving");
        for(var i = 0; i < players.length; i++)
        if(players[i].socket === socket)
            players.splice(i,1);
        }
    }
  });

  socket.on('ballSet', function(data) {
	socket.broadcast.emit('ballSet', data);
  });

  socket.on('score', function(data) {
    if(data == 1)
      score[0] += 7;
    else
      score[1] +=7;

    socket.emit('score', score);
	  socket.broadcast.emit('score', score);

    if(score[0] >= 77)
    {
      socket.emit('end', [1, score[0], score[1]]);
      socket.broadcast.emit('end', [1, score[0], score[1]]);
    }
    else if(score[1] >= 77)
    {
      socket.emit('end', [2, score[1], score[0]]);
      socket.broadcast.emit('end', [2, score[1], score[0]]);
    }
  });
  socket.on('click', function(data){
    players[0].socket.emit('click', data);
    console.log("Click X: " + data[0] + " Y: " + data[1]);
  });
});
