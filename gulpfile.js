'use strict';
var gulp = require('gulp'),
	browserify = require('browserify'),
	through = require('through2'),
	globby = require('globby'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	sourcemaps = require('gulp-sourcemaps'),
	reactify = require('reactify'),
	babel = require('gulp-babel'),
	stylus = require('gulp-stylus');

gulp.task('style', function() {
	gulp.src('./style/**/*.styl')
		.pipe(stylus())
		.pipe(gulp.dest('./dist/css/'));
});

gulp.task('build', function() {
	var bundledStream = through();
	bundledStream
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(babel())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist/js/'));

	globby(['./src/*.js'], function(err, entries) {
		if (err) { bundledStream.emit('error', err); return }
		var b = browserify({entries: entries, debug: true, transform: [reactify]});
		b.bundle().pipe(bundledStream);
	});
	return bundledStream;
});

gulp.task('watch', function() {
	gulp.watch('./src/**/*.js', ['build']).on('error', function(err) { console.log(err.toString())});
	gulp.watch('./style/**/*.styl', ['style']);
});
