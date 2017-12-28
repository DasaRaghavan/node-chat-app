const path = require('path');
const publicPath = path.join(__dirname, '..', 'public');
// const serverPath = path.join(__dirname, '..', 'server');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
// const {newUserWelcomeMessage, newUserBroadcastMessage} = require('./utils/message.js')
var {generateMessage} = require('./utils/message.js');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  // console.log(newUserWelcomeMessage);
  var newUserWelcomeMessage = generateMessage('Admin', 'Welcome to the chat app');
  var newUserBroadcastMessage = generateMessage('Admin', 'New user joined');
  socket.emit('createMessage', newUserWelcomeMessage);
  socket.broadcast.emit('createMessage', newUserBroadcastMessage);

  // socket.emit('newEmail', {
  //     from: 'test@example.com',
  //     sub: 'emit newEmail event from server',
  //     createdAt: 12345
  // });
  // socket.on('createEmail', (data) => {
  //   console.log('createEmail event fired by client', data);
  // });

  //
  // socket.on('connect', () => {
  //
  // });

  socket.on('createMessage', (data, callback) => {
    // var message = {
    //   to: data.to,
    //   text: data.text,
    //   createdAt: new Date().getTime()
    // };
    // console.log(data.to, data.text);
    var message = generateMessage(data.to, data.text);
    console.log('createMessage event fired by client', message );
    io.emit('createMessage', message);
    // socket.broadcast.emit('newMessage', message);
    callback('Acknowledgement from server');
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
