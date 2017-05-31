var moment = require('moment');
var date = moment();

var generateMessage = (from, text) => {
  return{
    from,
    text,
    createdAt: date.format('h:mm:ss A')
  };
};

var generateLocationMessage = (from, latitude, longitude) => {
  return{
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: date.format('h:mm:ss A')
  };
};

module.exports = {generateMessage, generateLocationMessage};
