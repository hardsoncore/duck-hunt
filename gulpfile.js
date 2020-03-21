var { task, parallel, series, src, dest, watch } = require('gulp'),
  uglify = require('gulp-uglify'),
  gulpSass = require('gulp-sass'),
  livereload = require('gulp-livereload');

function cleanFunc(cb) {
  // для билда нужно будет затирать папку (возможно)
  cb();
}

function sassFunc() {
  return src('./assets/sass/**/*.scss')
    .pipe(gulpSass().on('error', gulpSass.logError))
    .pipe(dest('./assets/css'));
}

function watchFunc() {
  // подписываемся на событие изменения в файлах
  livereload.listen();

  // watch будет срабатывать сам при каждом изменении
  watch(['./assets/sass/**/*.scss']).on('change', function() {
    console.log(`File 111 was added`);
    sassFunc();
  });

  watch(['*.html', './assets/css/**/*.css']).on('change', livereload.changed);
}

// series запускает все задачи по порядку. пока предыдущая не закончится, новая не стартует
// parallel позволяет выполнять задачи параллельно
exports.default = series(cleanFunc, sassFunc, parallel(watchFunc));
