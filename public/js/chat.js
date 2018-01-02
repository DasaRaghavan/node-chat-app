var socket = io();

function scrollToBottom() {
  // selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');


  // heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    // console.log('should scroll');
    messages.scrollTop(scrollHeight);
  }
  // console.log('newMessage', newMessage);
  // console.log('scrollTop', scrollTop);
  // console.log('clientHeight', clientHeight);
  // console.log('scrollHeight', scrollHeight);
  // console.log('newMessageHeight', newMessageHeight);
  // console.log('lastMessageHeight', lastMessageHeight);
}

socket.on('connect', function () {
  console.log('Connected to server');
  var params = jQuery.deparam(window.location.search);
  // console.log(params);

  socket.emit('join', params, function(err) {
    if(err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log("success");
    }
  });
});
//comments
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
  // console.log('Message from server', msg);

  var template = jQuery('#message-template').html();
  var time = moment(msg.createdAt).format('h:mm:s.SSS a');
  // var html = Mustache.render(template);
  var html = Mustache.render(template, {
    from: msg.from,
    createdAt: time,
    text: msg.text
  });
  jQuery('#messages').append(html);
  scrollToBottom();

  // var li = jQuery('<li></li>');
  // var time = moment(msg.createdAt).format('h:mm:s.SSS a');
  // li.text(`${msg.from} ${time}: ${msg.text}`);
  // jQuery('#messages').append(li);
});

socket.on('updateUsersList', function (users) {
  console.log(users);
  var ol = jQuery('<ol></ol>');

  users.forEach (function(user) {
    // console.log(user);
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);



});

socket.on('createLocationMessage', function (msg) {
  // console.log('LocationMessage from server this one ==>', msg);

  var template = jQuery('#location-message-template').html();
  var time = moment(msg.createdAt).format('h:mm:s.SSS a');
  var html = Mustache.render(template, {
    from: msg.from,
    createdAt: time,
    url: msg.url
  });
  jQuery('#messages').append(html);
  scrollToBottom();

  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My Current Location</a>');
  // var time = moment(msg.createdAt).format('h:mm:s.SSS a');
  // li.text(`${msg.from} ${time}: ${msg.from}: `);
  // a.attr('id', 'location-anchor');
  // a.attr('href', msg.url);
  // li.append(a);
  // jQuery('#messages').append(li);
});

socket.on('disconnect', function () {

});

  jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    var params = jQuery.deparam(window.location.search);
    socket.emit('createMessage', {
      to: params.name,
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
      var params = jQuery.deparam(window.location.search);
      socket.emit('createLocation', {
        name: params.name,
        room: params.room,
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
