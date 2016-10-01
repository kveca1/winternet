const express = require('express');
app = express();

server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.port || 3000;

server.listen(port, () => {
  console.log('Server listening at port', port);
});

app.use(express.static(__dirname));

let players = 0;

io.on('connections', socket => {
  socket.on('disconnected', () => {

  });
});
