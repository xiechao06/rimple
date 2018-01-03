const gulp = require('gulp');
const rollup = require('gulp-better-rollup');
const mocha = require('gulp-mocha');
const { argv } = require('yargs');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('rollup-plugin-babel');
const minify = require('rollup-plugin-babel-minify');
const environments = require('gulp-environments');
const { exec } = require('child_process');
const del = require('del');

gulp.task('doc', function (cb) {
  exec('node_modules/jsdoc/jsdoc.js README.md index.js op/*.js -c ./.jsdoc.json -d docs', () => {
    cb();
  });
});

gulp.task('build-min', function () {
  environments.current(environments.production);
  return build();
});

const build = function build () {
  return gulp.src('index.js')
  .pipe(sourcemaps.init())
  .pipe(rollup({
    plugins: [
      babel({
        presets: [
          ['env', {
            targets: {
              node: 'current',
              browsers: ['last 2 versions', 'ie 8'],
            },
            modules: false,
            forceAllTransforms: true,
          }],
        ],
        comments: !environments.production(),
      }),
      ...(environments.production()? [minify()]: [])
    ]
  }, {
    file: environments.production()? 'rimple.min.js': 'rimple.js',
    format: 'umd',
    name: 'rimple'
  }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./dist'));
};

gulp.task('build', build);

gulp.task('test', ['build'], function () {
  let args = {
    bail: true,
    require: ['co-mocha', 'source-map-support/register'],
  };
  if (argv.grep) {
    args.grep = argv.grep;
  }
  return gulp.src('./test.js')
  .pipe(mocha(args));
});

gulp.task('watch', function () {
  gulp.watch(['index.js', 'test.js', 'op/*.js'], ['test']);
});

gulp.task('watch-doc', function () {
  gulp.watch(['index.js', 'op/*.js'], ['doc']);
});

// call this task before every commit
gulp.task('pre-commit', ['doc', 'build', 'build-min']);

gulp.task('clean', function () {
  return del(['./docs', './dist']);
});

gulp.task('default', ['test', 'watch']);
