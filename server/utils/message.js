var generateMessage = ((from, text) => {
  var message = {
    from,
    text,
    createdAt: new Date().getTime()
  };
  return message;
});

var newUserWelcomeMessage = {
  text: 'Welcome to the chat app'
};
var newUserBroadcastMessage = {
  text: 'New User Joined'
};

// module.exports = {generateMessage, newUserWelcomeMessage, newUserBroadcastMessage};

module.exports = {generateMessage}
