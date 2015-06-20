var includeAll = require('include-all');
var express = require('express');
var path = require('path');

module.exports = (function () {
  var app = express();

  var routers = includeAll({
    dirname: path.resolve(__dirname, 'routers'),
    filter: /(.+)\.js$/
  });

  for (var key in routers) {
    routers[key](app);
  }

  return app;
})();
