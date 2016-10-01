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
});
