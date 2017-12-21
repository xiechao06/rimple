const gulp = require('gulp');
const rollup = require('gulp-better-rollup');
const mocha = require('gulp-mocha');
const { argv } = require('yargs');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('rollup-plugin-babel');
const minify = require('rollup-plugin-babel-minify');
const { production } = require('gulp-environments');

// const builder = function builder(doUglify) {
//   return function () {
//     return gulp.src('index.js')
//     .pipe(sourcemaps.init())
//     .pipe(rollup({
//       plugins: [
//         babel({
//           presets: [['env', {
//             modules: false,
//             browsers: ['ie8']
//           }]],
//           plugins: [
//             'external-helpers',
//             'transform-es2015-for-of'
//           ],
//         }),
//         ...(doUglify? [uglify()]: [])
//       ]
//     }, {
//       dest: doUglify? 'slot.min.js': 'slot.js',
//       format: 'umd',
//       moduleId: '$$',
//       moduleName: '$$'
//     }))
//     .pipe(sourcemaps.write('./'))
//     .pipe(gulp.dest('./dist'));
//   };
// };

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

gulp.task('default', ['test', 'watch']);
