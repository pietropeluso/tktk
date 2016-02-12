var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
// var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var compass = require('gulp-compass');


// Basic Gulp task syntax
gulp.task('hello', function() {
  console.log('Hello Zell!');
});


// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
});


// Vendor JavaScript files
gulp.task('vendor-scripts', function() {
  gulp.src([
      'node_modules/jquery/dist/jquery.js',
      'node_modules/bootstrap/dist/js/bootstrap.js',
      'node_modules/angular/angular.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('app/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});


gulp.task('scripts', function() {
  gulp.src('app/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('app/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
});


// Vendor styles
gulp.task('vendor-styles', function() {
  gulp.src([
      'node_modules/bootstrap/dist/css/bootstrap.css'
    ])
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('app/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('app/css'));
});


gulp.task('compass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(compass({
      sass: 'app/scss',
      css: 'app/css'
    }))
    .pipe(gulp.dest('app/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
});


// Watchers
gulp.task('watch', function() {
  gulp.watch('app/scss/**/*.scss', ['compass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', ['scripts']);
});


// Optimizing CSS and JavaScript
gulp.task('useref', function() {

  gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});


// Optimizing Images
gulp.task('images', function() {
  gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('app/images'))
});


// Copying fonts
gulp.task('fonts', function() {
  gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
});


// Cleaning
gulp.task('clean', function() {
  del.sync(['app/js/**', 'app/css/**']);
});


gulp.task('default', function(callback) {
  runSequence(['clean', 'vendor-styles', 'compass', 'vendor-scripts', 'scripts', 'browserSync', 'watch'],
    callback
  )
});
