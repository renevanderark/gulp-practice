#!/usr/bin/env node

var browserSync = require("browser-sync").create();
var modRewrite = require("connect-modrewrite");

var watchFiles = ["dist/css/*.css", "dist/js/*.js", "index.html"];

browserSync.watch(watchFiles, function (event, file) {
        if (event === "change") {
                browserSync.reload(file);
        }
});

browserSync.init({
        server: {
                baseDir: ".",
                middleware: modRewrite([
                        "^[^\\.]*$ /index.html [L]"
                ])
        }
});
