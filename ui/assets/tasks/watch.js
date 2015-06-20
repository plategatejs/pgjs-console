var path = require('path');

module.exports = function (gulp) {
  gulp.task('watch', function () {
    gulp.watch(path.resolve(__dirname, '..', 'js/**'), ['scripts']);
    gulp.watch(path.resolve(__dirname, '..', 'css/**'), ['styles']);
  });
};
