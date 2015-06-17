var sourcemaps = require('gulp-sourcemaps'),
  source = require('vinyl-source-stream'),
  browserify = require('browserify'),
  buffer = require('vinyl-buffer'),
  uglify = require('gulp-uglify'),
  path = require('path');

var isEnvDevelopment = !!process.env.NODE_ENV && process.env.NODE_ENV === 'development';

var SCRIPTS_DIR = 'assets/js',
  DIST_DIR = 'assets/dist';

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
        entries: path.resolve(SCRIPTS_DIR, script.src),
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

      stream.pipe(gulp.dest(DIST_DIR));
    });
  };

  gulp.task('scripts', task);
};
