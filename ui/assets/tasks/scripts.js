var sourcemaps = require('gulp-sourcemaps'),
  source = require('vinyl-source-stream'),
  browserify = require('browserify'),
  buffer = require('vinyl-buffer'),
  uglify = require('gulp-uglify'),
  path = require('path');

var isEnvDevelopment = !!process.env.NODE_ENV && process.env.NODE_ENV === 'development';

var SCRIPTS_DIR = 'js',
  DIST_DIR = 'dist';

var scripts = [{
  src: 'main.js',
  dist: 'pgjs.js'
}];

var config = {
  compress: true,
  mangle: true,
  preserveComments: 'some'
};

module.exports = function (gulp) {
  var task = function () {
    scripts.forEach(function (script) {
      var stream = browserify({
        entries: path.resolve(__dirname, '..', SCRIPTS_DIR, script.src),
        debug: isEnvDevelopment
      }).bundle();

      stream = stream
        .pipe(source(script.dist))
        .pipe(buffer());

      if (isEnvDevelopment) {
        stream = stream
          .pipe(sourcemaps.init({loadMaps: true}))
          .pipe(sourcemaps.write());
      }
      else {
        stream = stream.pipe(uglify(config));
      }

      stream.pipe(gulp.dest(path.resolve(__dirname, '..', DIST_DIR)));
    });
  };

  gulp.task('scripts', task);
};
