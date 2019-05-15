
'use strict';

// SASS Packages
var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

// JS Packages
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
//var babel = require('gulp-babel');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

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

// Lint Task

gulp.task('lint', function() {
    return gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


gulp.task('scripts', () => {
  return gulp.src('./src/js/*.js')
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest('./dist/js'));
});

// Concatenate & Minify JS
/*gulp.task('scripts', function() {
    return gulp.src([
        'node_modules/jquery/dist/jquery.js',
        './src/js/*.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(babel({
          // transpile ES6 to ES5 and minify
          presets: ['@babel/preset-env', 'minify'] // bug with minify - doesnt reload
        }))
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(sourcemaps.write())
        .pipe(rename('scripts.min.js'))
        .pipe(browserSync.reload({
             stream: true
         }))

}); */


gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './',
            index: "index_empty.html"
       },
    })
})

gulp.task('default',['browserSync', 'sassworkflow', 'scripts'], function() {
    gulp.watch('./src/js/*.js', ['lint', 'scripts']);
    gulp.watch('./src/sass/**/*.scss', ['sassworkflow']);
})