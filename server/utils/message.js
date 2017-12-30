var generateMessage = ((from, text) => {
  var message = {
    from,
    text,
    createdAt: new Date().getTime()
  };
  return message;
});

var generateLocationMessage = ((from, lat, long) => {
  var message = {
    from,
    lat,
    long,
    url: `https://www.google.com/maps/search/${lat},${long}`
  };
  return message;
});



// module.exports = {generateMessage, newUserWelcomeMessage, newUserBroadcastMessage};

module.exports = {generateMessage, generateLocationMessage};
