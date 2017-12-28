var socket = io();
socket.on('connect', function () {
  console.log('Connected to server');
});
// socket.on('newEmail', function(data) {
//   console.log('newEmail event received from server', data);
// });

// socket.emit('createEmail', {
//   to: 'fromClient@example.com',
//   sub: 'emit createEmail event from client',
//   scheduleTime: 123
// });

socket.emit('createMessage', {
  to: 'messageServer@example.com',
  text: 'emit new createMessage event from client',
});

socket.on('newMessage', function (msg) {
  console.log('Message from server', msg);
});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});
