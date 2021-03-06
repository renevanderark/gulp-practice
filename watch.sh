#!/bin/sh
mkdir -p dist/css dist/js
stylus --compress --out dist/css --watch style &
nodemon -w ./__tests__ -w ./src -e js,jsx -x npm test &
./bsync.js &
watchify ./src/app.js \
	--detect-globals false \
        --extension=.js \
        --outfile dist/js/app.js \
        --transform [ babelify ] \
        --verbose

