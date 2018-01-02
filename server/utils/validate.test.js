const expect = require('expect');

var {isRealString} = require('./validate');

describe('Validate search string to join the room', () => {

  it('should confirm if params.name is a string', () => {
    var params = {
      name: 'Dasa',
      room: 'Family Room'
    };
    expect(isRealString(params.name)).toBe(true);
    expect(isRealString(params.room)).toBe(true);
  });

  it('should reject non-string values', () => {
    var params = {
      name: 123, // reject number
      room: false // reject boolean
    };
    expect(isRealString(params.name)).toBe(false);
    expect(isRealString(params.room)).toBe(false);
  });

  it('should reject string with only spaces', () => {
    var params = {
      name: '   ', // reject spaces
      room: '    ' // reject spaces
    };
    expect(isRealString(params.name)).toBe(false);
    expect(isRealString(params.room)).toBe(false);
  });

});
