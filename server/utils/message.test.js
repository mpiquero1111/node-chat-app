var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('genreateMessage', () => {
  it('should generate the correct mesage object', () => {
    var from = 'Jen';
    var text = 'Some Message';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({ from, text });
  });
});

describe('genreatelocationMessage', () => {
  it('should generate the correct location object', () => {
    var from = 'Jen';
    var latitude = 15;
    var longitude = 19;
    var url ='https://www.google.com/maps?q=15,19';
    var message = generateLocationMessage(from, latitude, longitude);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({ from, url });
  });
});
