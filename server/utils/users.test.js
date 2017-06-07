const expect = require('expect');
const {Users} = require('./users');

describe ('Users', () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Andrew',
      room: 'Awesome Sauce'
    },{
      id: '2',
      name: 'Jen',
      room: 'Some Sauce'
    },{
      id: '3',
      name: 'Mike',
      room: 'Awesome Sauce'
    }]
  });

  it ('should add new user', () => {
    var users = new Users();
    var user = {
      id: '1',
      name: 'Andrew',
      room: 'Awesome Sauce'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('Should return names in a room', () => {
    var userList = users.getUserList('Awesome Sauce');

    expect(userList).toEqual(['Andrew', 'Mike']);
  });

  it('Should return names in other room', () => {
    var userList = users.getUserList('Some Sauce');

    expect(userList).toEqual(['Jen']);
  });

  it('Should find user', () => {
    var userID = '2';
    var user = users.getUser(userID);

    expect(user.id).toBe(userID);
  });

  it('Should not find user', () => {
    var userID = '4';
    var user = users.getUser(userID);

    expect(user).toNotExist();
  });

  it('should remove a user', () => {
    var userID = '1';
    var user = users.removeUser(userID);

    expect(user.id).toBe(userID);
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    var userId = '99';
    var user = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

});
