var jscs = require('gulp-jscs'),
  path = require('path');

module.exports = function (gulp) {
  gulp.task('jscs', function () {
    gulp.src(path.resolve(__dirname, '../js/**.js')).pipe(jscs());
  });
};
