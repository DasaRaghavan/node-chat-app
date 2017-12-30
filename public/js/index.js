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

var messageBox = jQuery('[name=message]');

socket.on('createMessage', function (msg) {
  console.log('Message from server', msg);
  var li = jQuery('<li></li>');
  li.text(`${msg.from}: ${msg.text}`);
  jQuery('#messages').append(li);
});

socket.on('createLocationMessage', function (msg) {
  console.log('LocationMessage from server this one ==>', msg);
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Current Location</a>');
  li.text(`${msg.from}: `);
  a.attr('id', 'location-anchor');
  a.attr('href', msg.url);
  li.append(a);
  jQuery('#messages').append(li);
});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

  jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
      to: 'User',
      text: messageBox.val()
    }, function(ack) {
        text: messageBox.val(ack);
    });
  });

  var locationButton = jQuery('#send-location');

  locationButton.on('click', function() {
    if (!navigator.geolocation) {
      return alert('Navigator Geolocation not available');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
      // console.log(position);
      locationButton.removeAttr('disabled').text('Send location');
      socket.emit('createLocation', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }, function (message) {
        console.log(message);
      });
    }, function () {
      locationButton.removeAttr('disabled').text('Send location');
      alert('geolocation prevented. Permission denied.')
    });
  });
