var includeAll = require('include-all');
var path = require('path');
var gulp = require('gulp');

var tasks = includeAll({
    dirname: path.resolve('assets/tasks'),
    filter: /(.+)\.js$/
});

for (var key in tasks) {
    var task = tasks[key];
    task(gulp);
}
