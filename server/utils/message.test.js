const expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message.js')

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

  describe('Generate Location Message', () => {
    it('should generate location message on event', () => {
      var from = 'Andrew';
      var lat = 1;
      var long = 1;
      var message = generateLocationMessage(from, lat, long);
      var url = 'https://www.google.com/maps/search/1,1'
      // console.log(message);
      //
      // expect(message.from).toBe('Andrew');
      // expect(message.text).toBe('some text');
      expect(message.url).toBe(url);
      expect(message).toHaveProperty('from', 'Andrew');
      expect(message).toHaveProperty('lat', 1);
      expect(message).toHaveProperty('long', 1);

      });
    });
