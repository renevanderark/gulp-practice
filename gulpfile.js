'use strict';


var watchify = require('watchify'),
	browserify = require('browserify'),
	babelify = require('babelify'),
	gulp = require('gulp'),
	sourcemaps = require('gulp-sourcemaps'),
	source = require('vinyl-source-stream'),
	glob = require('glob'),
	buffer = require('vinyl-buffer'),
	stylus = require('gulp-stylus'),
	gutil = require('gulp-util'),
	jest = require('gulp-jest'),
	opts = {
		entries: glob.sync('./src/**/*.js'),
		debug: true
	};

require('harmonize')();

var b = watchify(browserify(opts))
	.on('update', bundle)
	.on('log', gutil.log);


gulp.task('build', bundle);
gulp.task('style', style);

 
gulp.task('jest', function () {
    return gulp.src('__tests__').pipe(jest({
        scriptPreprocessor: "../preprocessor.js",
        unmockedModulePathPatterns: [
            "node_modules/react"
        ],
        testPathIgnorePatterns: [
            "node_modules"
        ],
        moduleFileExtensions: [
            "js",
            "json",
            "react"
        ]
    }));
});

function style() {
	console.log('--*style*--');
	gulp.src('./style/**/*.styl')
		.pipe(stylus())
		.pipe(gulp.dest('./dist/css/'));
}

function bundle() {
	console.log('--*bundle*--');
	return b
		.transform(babelify)
		.bundle()
		.on("error", logError)
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist/js/'))
}

function logError(err) {
	gutil.log("Error : " + err.message);
	this.emit('end');
}

gulp.task('default', function() {
	bundle();
	gulp.watch('./style/**/*.styl', ['style']);
});