var config = require('config');

var port = config.get('server.port');

var app = require('./lib/app');
app.listen(port, function () {
  console.log('Server running on port ' + port + '.');
});
