//addUser(id, name, room)
//getUser(id)
//removeUser(id)
//getUserList(room)

class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    // get the user object
    // push the object into the array
    // return the added user

    var user =  {id, name, room};
    this.users.push(user);
    return user;
  }
  getUser (id) {
    // filter the array by user id
    // return the first element of the filtered array

    var user = this.users.filter((user) => user.id === id);
    return user[0];
  }
  removeUser (id) {
    //  get the user by id
    // remove the user from the array of objects
    // return the removed user

    var user = this.getUser(id);
    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;

  }
  getUserList (room) {
    // return this.users.filter((user) => user.room === room);
    // if(room) {
      // var users = this.users.filter((user) => user.room === room);
      // var namesArray = users.map((user) => user.name );
      // return namesArray;
    // }
    // else {
    //   var namesArray = this.users.map((user) => user.name );
    //   return namesArray;
    // }
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name );
    return namesArray;
  }
}

module.exports = {Users};

// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//
//   getUserDesription() {
//     return `${this.name} is ${this.age} year(s) old`;
//   }
// }
//
// var me = new Person('Dasa', 50);
// var son = new Person('Anish', 17);
//
// console.log(me.getUserDesription());
// console.log(son.getUserDesription());
