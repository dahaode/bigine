/**
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 BiGood.com
 * @license   GPL-3.0+
 */

var bigine = require('./lib/bigine'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    del = require('del'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    smap = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    watchify = require('watchify');

/** 清除过期地打包文件 */
gulp.task('clear', function () {
    del('./var/build/*');
});

/** 实时打包 */
gulp.task('watch', function () {
    var b = browserify({
        cache: {},
        packageCache: {},
        debug: true
    });
    b.require('./lib/bigine', {expose: 'bigine'});
    watchify(b)
        .bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source(bigine.$version.split('-')[0] + '.min.js'))
        .pipe(buffer())
        .pipe(smap.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(smap.write('./'))
        .pipe(gulp.dest('./var/build'));
});

/** var/build/<version>.js */
gulp.task('bundle', function () {
    browserify()
        .require('./lib/bigine', {expose: 'bigine'})
        .bundle()
        .pipe(source(bigine.$version.split('-')[0] + '.js'))
        .pipe(gulp.dest('./var/build'));
});

/** var/build/<version>.min.js */
gulp.task('minify', function () {
    browserify({debug: true})
        .require('./lib/bigine', {expose: 'bigine'})
        .bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source(bigine.$version.split('-')[0] + '.min.js'))
        .pipe(buffer())
        .pipe(smap.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(smap.write('./'))
        .pipe(gulp.dest('./var/build'));
});

gulp.task('default', ['minify']);
