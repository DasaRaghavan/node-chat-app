const path = require('path');
const publicPath = path.join(__dirname, '..', 'public');
// const serverPath = path.join(__dirname, '..', 'server');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
// const {newUserWelcomeMessage, newUserBroadcastMessage} = require('./utils/message.js')
const {isRealString} = require('./utils/validate');
var {generateMessage, generateLocationMessage} = require('./utils/message.js');

const {Users} = require('./utils/users');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  // console.log(newUserWelcomeMessage);


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

  socket.on('join', (params, callback) => {
    //validate if params are real
    // console.log(params);
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback("Name and Room Name are required!")
    }

    socket.join(params.room);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUsersList', users.getUserList(params.room));

    var newUserWelcomeMessage = generateMessage('Admin', 'Welcome to the chat app');
    var newUserBroadcastMessage = generateMessage('Admin', `${params.name} has joined`);
    socket.join(params.room);
    socket.emit('createMessage', newUserWelcomeMessage);
    socket.broadcast.to(params.room).emit('createMessage', newUserBroadcastMessage);
    callback();

  });

  socket.on('createMessage', (data, callback) => {
    var user = users.getUser(socket.id);

    // var message = {
    //   to: data.to,
    //   text: data.text,
    //   createdAt: new Date().getTime()
    // };
    // console.log(data.to, data.text);
    if (user && isRealString(data.text)){
      var message = generateMessage(user.name, data.text);
      console.log('createMessage event fired by client', message );
      io.to(user.room).emit('createMessage', message);
      callback();
    }
      // socket.broadcast.emit('createMessage', message);
    // } else {
    //   callback();
    // }


  });

  socket.on('createLocation', (locationData, callback) => {
    var location = {
      name: locationData.name,
      room: locationData.room,
      lat: locationData.latitude,
      long: locationData.longitude
    }
    console.log(location);
    // io.emit('createMessage', generateMessage('User', `${location.lat}, ${location.long}`));
    io.to(location.room).emit('createLocationMessage', generateLocationMessage(location.name, location.lat, location.long));
    callback('createLocationMessage received by server');
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    var user = users.removeUser(socket.id);
    console.log('.....', users.getUserList(user.room));
    io.to(user.room).emit('updateUsersList', (users.getUserList(user.room)));
    io.to(user.room).emit('createMessage', generateMessage('Admin', `${user.name} has left the room`));
  });

  });

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
