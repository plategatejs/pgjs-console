var sourcemaps = require('gulp-sourcemaps'),
  minify = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  less = require('gulp-less'),
  path = require('path');

var isEnvDevelopment = !!process.env.NODE_ENV && process.env.NODE_ENV === 'development';

var STYLES_DIR = 'css',
  DIST_DIR = 'dist';

var styles = [{
  src: 'main.less',
  dist: 'pgjs.css'
}];

module.exports = function (gulp) {
  var task = function () {
    styles.forEach(function (style) {
      var stream = gulp.src(path.resolve(__dirname, '..', STYLES_DIR, style.src));

      stream = stream
        .pipe(less())
        .pipe(rename(style.dist));

      if (isEnvDevelopment) {
        stream = stream
          .pipe(sourcemaps.init())
          .pipe(sourcemaps.write());
      }
      else {
        stream = stream.pipe(minify({processImport: false}));
      }

      stream.pipe(gulp.dest(path.resolve(__dirname, '..', DIST_DIR)));
    });
  };

  gulp.task('styles', task);
};
