module.exports = function (gulp) {
  gulp.task('watch', function () {
    gulp.watch('assets/js/**', ['scripts']);
    gulp.watch('assets/css/**', ['styles']);
  });
};
