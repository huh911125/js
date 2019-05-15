
'use strict';

// SASS Packages
var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

// SYNC
var browserSync = require('browser-sync').create();


gulp.task('sassworkflow', function () {
    gulp.src('./src/sass/**/*.scss')
    // tasks go here
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});


gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './',
            index: "index_empty.html"
       },
    })
})

gulp.task('default',['browserSync', 'sassworkflow'], function() {
    gulp.watch('./src/sass/**/*.scss', ['sassworkflow']);
})