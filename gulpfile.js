var { task, parallel, series, src, dest, watch } = require('gulp'),
  uglify = require('gulp-uglify'),
  gulpSass = require('gulp-sass'),
  concatCss = require('gulp-concat-css'),
  livereload = require('gulp-livereload');

function cleanFunc(cb) {
  // для билда нужно будет затирать папку (возможно)
  cb();
}

function sassToCssFunc() {
  return src('./assets/styles/sass/**/*.scss')
    .pipe(gulpSass().on('error', gulpSass.logError))
    .pipe(dest('./assets/styles/css'));
}

function concatCssFunc() {
  return src(['./assets/styles/css/*.css', '!./assets/styles/css/bundle.css'])
    .pipe(concatCss('bundle.css'))
    .pipe(dest('./assets/styles/css'));
}

function watchFunc() {
  // подписываемся на событие изменения в файлах
  livereload.listen();

  // watch будет срабатывать сам при каждом изменении во входных файлах scss
  watch(['./assets/styles/sass/**/*.scss']).on('change', function() {
    console.log(`File 111 was added`);
    let rebuild = series(sassToCssFunc, concatCssFunc);
    rebuild();
  });

  // watch будет срабатывать сам при каждом изменении в index.html или bundle.css
  watch(['*.html', './assets/styles/css/bundle.css']).on('change', livereload.changed);
}

// series запускает все задачи по порядку. пока предыдущая не закончится, новая не стартует
// parallel позволяет выполнять задачи параллельно
exports.default = series(cleanFunc, sassToCssFunc, concatCssFunc, parallel(watchFunc));
