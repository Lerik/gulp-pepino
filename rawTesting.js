var gulp_pepino = require('./index.js');
var browsers = require('./index.js').browsers;
var gulp = require('gulp');

gulp.src('./tests/feature/*.step')
    .pipe(gulp_pepino.pepino());
