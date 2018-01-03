const gulp = require('gulp');
const { exec } = require('child_process');
const sourcemaps = require('gulp-sourcemaps');
const rollup = require('gulp-better-rollup');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const portfinder = require('portfinder');
const connect = require('gulp-connect');
const fs = require('fs');

gulp.task('connect', function() {
  portfinder.getPort(function (err, port) {
    connect.server({
      root: './',
      livereload: true,
      port,
    });
  });
});

gulp.task('html', function() {
  return gulp.src('./index.html')
  .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('js/*.js', ['build']);
  gulp.watch('./index.html', ['html']);
});

gulp.task('link', function (cb) {
  fs.access('../../../dist/rimple.js', fs.constants.R_OK, (err) => {
    if (err) {
      console.log('please run npm build in package root directory!');
      return;
    }
    exec('ln -sf ../../../dist/rimple.js ./js/rimple.js', () => {
      exec('ln -sf ../../../dist/rimple.js.map ./js/rimple.js.map', () => {
        cb();
      });
    });
  });
});

gulp.task('build', function () {
  gulp.src('js/main.js')
  .pipe(sourcemaps.init())
  .pipe(rollup({
    plugins: [ nodeResolve(), commonjs() ],
  }, 'iife'))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./dist/js/'))
  .pipe(connect.reload());
});

gulp.task('default', ['link', 'build', 'watch', 'connect']);

