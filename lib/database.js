var includeAll = require('include-all');
var mongoose = require('mongoose');
var config = require('config');
var path = require('path');
var util = require('util');

module.exports = function (callback) {
  var uri = util.format(
    'mongodb://%s:%s@%s:%d/%s',
    config.get('mongodb.username'),
    config.get('mongodb.password'),
    config.get('mongodb.host'),
    config.get('mongodb.port'),
    config.get('mongodb.database')
  );

  var connection = mongoose.createConnection(uri);

  var models = includeAll({
    dirname: path.resolve(__dirname, 'models'),
    filter: /(.+)\.js$/
  });

  for (var name in models) {
    models[name](connection);
  }

  connection.on('disconnected', function () {
    console.log('Disconnected from MongoDB.');
  });

  connection.on('connected', function () {
    console.log('Connected to MongoDB.');
  });

  callback(connection);
};
