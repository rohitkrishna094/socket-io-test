let express = require('express');

let app = express();
let server = app.listen(4000, () => {
  console.log('listening for request on port 4000');
});

let io = require('socket.io')(server);
app.use(express.static('public'));

io.on('connection', socket => {
  console.log('made socket connection, ', socket.id);

  socket.on('chat', data => io.sockets.emit('chat', data));

  socket.on('typing', data => socket.broadcast.emit('typing', data));
});
