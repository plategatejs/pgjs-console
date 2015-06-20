var includeAll = require('include-all');
var express = require('express');
var path = require('path');

module.exports = (function () {
  var app = express();

  // static content serving
  app.use('/static', express.static(path.resolve(__dirname, 'assets/dist')));

  // setting jade view engine up
  app.set('view engine', 'jade');
  app.set('view cache', app.get('env') === 'production');
  app.set('views', path.resolve(__dirname, 'views'));
  app.locals.pretty = app.get('env') === 'development';

  var routers = includeAll({
    dirname: path.resolve(__dirname, 'routers'),
    filter: /(.+)\.js$/
  });

  for (var key in routers) {
    routers[key](app);
  }

  return app;
})();
