var moment = require ('moment');

// var createdAt = new Date().getTime();
var createdAt = moment().valueOf();
// console.log(date.format('MMM Do, YYYY, hh:mm:ss a'));

var createdAtTimestamp = moment(createdAt).format('hh:mm:SSS');

var date = moment();
setTimeout(() => {
  console.log('createdAtTimestamp:', createdAtTimestamp);
}, 2000);

console.log('Date:', date.format('hh:mm:SSS'));
