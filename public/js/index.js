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

// socket.emit('createMessage', {
//   to: 'messageServer@example.com',
//   text: 'emit new createMessage event from client',
// }, function (ack) {
//   console.log('Got it!', ack);
// });

// socket.on('newUser', function (msg) {
//   console.log('Message from server', msg);
// });

socket.on('createMessage', function (msg) {
  console.log('Message from server', msg);
  var li = jQuery('<li></li>');
  li.text(`${msg.from}: ${msg.text}`);

  jQuery('#messages').append(li);
});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
    to: 'User',
    text: jQuery('[name=message]').val()
  }, function(ack) {

  });
});
