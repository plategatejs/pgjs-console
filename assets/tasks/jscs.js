var jscs = require('gulp-jscs'),
  path = require('path');

module.exports = function (gulp) {
  gulp.task('jscs', function () {
    gulp.src(path.resolve('assets/js/**.js')).pipe(jscs());
  });
};
