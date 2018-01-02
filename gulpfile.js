const gulp = require('gulp');
const rollup = require('gulp-better-rollup');
const mocha = require('gulp-mocha');
const { argv } = require('yargs');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('rollup-plugin-babel');
const minify = require('rollup-plugin-babel-minify');
const { production } = require('gulp-environments');
const { exec } = require('child_process');

gulp.task('doc', function (cb) {
  exec('node_modules/jsdoc/jsdoc.js README.js index.js op/*.js -c ./.jsdoc.json -d docs', () => {
    cb();
  });
});

gulp.task('build', function () {
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
            minify: true,
            forceAllTransforms: true,
          }],
        ],
      }),
      ...(production()? [minify()]: [])
    ]
  }, {
    file: production()? 'ripple.min.js': 'ripple.js',
    format: 'umd',
    // moduleId: '$$',
    name: '$$'
  }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./dist'));
});

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

gulp.task('default', ['test', 'watch']);
