var expect = require('expect');

var {generateMessage} = require('./message');

describe('genreateMessage', () => {
  it('should generate the correct mesage object', () => {
    var from = 'Jen';
    var text = 'Some Message';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({ from, text });
  });
});
