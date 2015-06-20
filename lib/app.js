var express = require('express');
var path = require('path');

var database = require('./database');

module.exports = (function () {
  // express main application
  var app = express();

  // express subapplications
  var subapps = {
    '/api': require(path.resolve('api'))
  };

  // subapplications shared resources
  var locals = {};

  database(function (connection) {
    locals.mongodb = connection;
  });

  // setting subapplications and their resources up
  for (var i in subapps) {
    var subapp = subapps[i];

    for(var j in locals) {
      subapp.locals[j] = locals[j];
    }

    app.use(i, subapp);
  }

  return app;
})();
