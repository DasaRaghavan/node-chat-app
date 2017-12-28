const path = require('path');
const publicPath = path.join(__dirname, '..', 'public');
// const serverPath = path.join(__dirname, '..', 'server');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  // socket.emit('newEmail', {
  //     from: 'test@example.com',
  //     sub: 'emit newEmail event from server',
  //     createdAt: 12345
  // });
  // socket.on('createEmail', (data) => {
  //   console.log('createEmail event fired by client', data);
  // });

  socket.on('createMessage', (data) => {
    var message = {

    }
    console.log('createMessage event fired by client', message );
    io.emit('newMessage', {
      to: data.to,
      text: data.text,
      createdAt: new Date().getTime()
    });

  });
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
