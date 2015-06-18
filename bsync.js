#!/usr/bin/env node

var browserSync = require("browser-sync").create();
var modRewrite = require("connect-modrewrite");
var debounce = require("lodash.debounce");
var watchFiles = ["dist/css/*.css", "dist/js/*.js", "index.html"];

browserSync.init({
        server: {
                baseDir: ".",
                middleware: modRewrite([
                        "^[^\\.]*$ /index.html [L]"
                ])
        }
});

var onFilesChanged = function (event, file) {
    if (event === "change") {
		browserSync.reload(file);
    }
};

browserSync.watch(watchFiles, debounce(onFilesChanged, 300));