#!/usr/bin/env node

var path = require('path');

process.env.NODE_CONFIG_DIR = path.resolve(__dirname, '../config');
var config = require('config');

var database = require(path.resolve(__dirname, '../lib/database.js'));

if (process.argv.length >= 3) {
  var username = process.argv[2];
  var password = process.argv[3];

  database(function (connection) {
    var User = connection.model('User');

    var user = new User({
      username: username,
      password: password
    });

    user.save(function (err) {
      if (!!err) {
        console.log('Error occurred while trying to add a user ' + username + '.');
      }
      else {
        console.log('User ' + username + ' has been added successfully.');
      }

      connection.close();
    });
  });
}
else {
  console.log('Adds a user to the system');
  console.log('Usage: addUser.js <username> <password>');
}
