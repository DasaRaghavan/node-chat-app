var moment = require('moment');


var generateMessage = ((from, text) => {
  // var created = moment().valueOf();
  // var timeStamp = moment(created).format('hh:mm:ss.SSS');
  var message = {
    from,
    text,
    createdAt: moment().valueOf()
  };
  return message;
});

var generateLocationMessage = ((from, lat, long) => {
  // var created = moment().valueOf();
  // var timeStamp = moment(created).format('hh:mm:ss.SSS');

  var message = {
    from,
    lat,
    long,
    url: `https://www.google.com/maps/search/${lat},${long}`,
    createdAt: moment().valueOf()
  };
  return message;
});



// module.exports = {generateMessage, newUserWelcomeMessage, newUserBroadcastMessage};

module.exports = {generateMessage, generateLocationMessage};
