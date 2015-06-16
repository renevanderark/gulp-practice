#!/bin/sh
mkdir -p dist/css dist/js
stylus --compress --out dist/css --watch style &
watchify ./src/app.js \
	--detect-globals false \
        --extension=.js \
        --outfile dist/js/app.js \
        --transform [ babelify ] \
        --verbose

