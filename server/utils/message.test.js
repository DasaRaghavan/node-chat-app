const expect = require('expect');
var {generateMessage} = require('./message.js')

describe('Generate Message', () => {
  it('should generate message on event', () => {
    var to = 'Andrew';
    var text = 'some text';
    var message = generateMessage(to, text);
    // console.log(message);
    //
    // expect(message.from).toBe('Andrew');
    // expect(message.text).toBe('some text');
    expect(message.createdAt).toBeGreaterThan(0);
    expect(message).toHaveProperty('from', 'Andrew');
    expect(message).toHaveProperty('text', 'some text');

    });
  });
