md dist\js
md dist\css
start /B browser-sync start --files "dist/css/*.css, dist/js/*.js, index.html" --server --reload-delay 500 &
start /B stylus --compress --out dist/css --watch style
watchify ./src/app.js^
	--detect-globals false^
    --extension=.js^
	--outfile dist/js/app.js^
	--transform [ babelify ]^
	--verbose
