'use strict';
var gulp = require('gulp'),
	browserify = require('browserify'),
	through = require('through2'),
	globby = require('globby'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	sourcemaps = require('gulp-sourcemaps'),
	reactify = require('reactify'),
	babel = require('gulp-babel');

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
	gulp.watch('./src/*.js', ['build']);
});
