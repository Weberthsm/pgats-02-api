const bcrypt = require('bcryptjs');

// In-memory user database
const users = [
  {
    username: 'julio', 
    password: bcrypt.hashSync('123456', 8), 
    favorecidos: [ 'priscila', 'joao' ], 
    saldo: 10000
  },
  {
    username: 'priscila', 
    password: bcrypt.hashSync('123456', 8), 
    favorecidos: [ 'julio' ], 
    saldo: 10000
  },{
    username: 'weberth', 
    password: bcrypt.hashSync('123456', 8), 
    favorecidos: [ 'carlos' ], 
    saldo: 10000
  },
   {
    username: 'joao',
    password: bcrypt.hashSync('123456', 8),
    favorecidos: [],
    saldo: 10000
  }
];

module.exports = {
  users
};
