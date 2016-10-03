var gulp = require('gulp'),
  streamqueue = require('streamqueue'),
  minifyHtml = require('gulp-minify-html'),
  templateCache = require('gulp-angular-templatecache'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify');

gulp.task('ionic-datepicker', function() {
  var stream = streamqueue({objectMode: true});
  stream.queue(
    gulp.src('./src/directives/decorators/ionic/datepicker/*.html')
    .pipe(minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(templateCache({
      module: 'schemaForm',
      root: 'directives/decorators/ionic/datepicker/'
    }))
    );
  stream.queue(gulp.src('./src/directives/decorators/ionic/datepicker/*.js'));

  stream.done()
  .pipe(concat('ionic-datepicker.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./dist/'));

});