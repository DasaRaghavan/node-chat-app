const expect = require('expect');
const {Users} = require('./users');

var myUserList;
//
//
// console.log(myUserList);
// console.log('all users: ', myUserList.getUserList());
// console.log('users in Office: ', myUserList.getUserList('Office'));
// console.log('123 user: ', myUserList.getUser('123'));
//
// console.log('remove user', myUserList.removeUser('123'));

beforeEach(() => {
  myUserList = new Users();
  user1 = myUserList.addUser('123','Dasa1','Office');
  user2 = myUserList.addUser('456','Dasa2','Office');
  user3 = myUserList.addUser('789','Dasa3','Home');
});

describe('Users', () => {
  it('should return the user object', () => {

    var user = {
      id: '123',
      name: 'Dasa',
      room: 'Office'
    };

    var user1 = new Users();
    var responseUser = user1.addUser(user.id, user.name, user.room);

    expect(responseUser).toMatchObject(user);
    expect(user1.users).toEqual([user]);
  });

  it('should get user by id', () => {
    var resUser = myUserList.getUser('123');
    expect(resUser).toEqual(myUserList.users[0]);
  });

  it('should NOT get user by id if invalid id', () => {
    var resUser = myUserList.getUser('656');
    expect(resUser).toBeUndefined();
  });

  it('should get all users for a room', () => {
    var resUser = myUserList.getUserList('Office');
    expect(resUser).toEqual(['Dasa1', 'Dasa2']);
  });

  it('should remove users by id', () => {
    var resUser = myUserList.removeUser('123');
    expect(resUser).toEqual({"id": "123", "name": "Dasa1", "room": "Office"});
    expect(myUserList.users.length).toBe(2);
  });

  it('should NOT remove any users if id is not in the array', () => {
    var resUser = myUserList.removeUser('786');
    expect(resUser).toBeUndefined;
  });

});
