var $gulp = require('gulp'),
    $lint = require('gulp-tslint'),
    $smap = require('gulp-sourcemaps'),
    $tsc = require('gulp-typescript'),
    $replace = require('gulp-replace'),
    $insert = require('gulp-insert'),
    $browserify = require('browserify'),
    $source = require('vinyl-source-stream'),
    $buffer = require('vinyl-buffer'),
    $uglify = require('gulp-uglify');

$gulp.task('lint', function () {
    return $gulp.src([
        'lib/**/*.ts',
        '!lib/**/*.d.ts'
    ])
        .pipe($lint())
        .pipe($lint.report('prose'));
});

$gulp.task('compile', function () {
    var pkg = require('./package.json'),
        ts = $gulp.src('lib/Bigine.ts')
            .pipe($smap.init())
            .pipe($tsc($tsc.createProject('tsconfig.json', {
                outFile: pkg.name + '.js',
                typescript: require('typescript')
            })));
    return ts.js
        .pipe($replace(/\$\{BIGINE_VERSION\}/, pkg.version))
        .pipe($insert.append('module.exports=Bigine;'))
        .pipe($smap.write('.'))
        .pipe($gulp.dest('var/build'));
});

$gulp.task('bundle', ['lint', 'compile'], function () {
    var pkg = require('./package.json');
    return $browserify({
            detectGlobals: false
        })
        .require('./var/build/' + pkg.name, {
            expose: 'bigine'
        })
        .bundle()
        .pipe($source(pkg.version + '.js'))
        .pipe($gulp.dest('var/build'));
});

$gulp.task('minify', ['lint', 'compile'], function () {
    var pkg = require('./package.json');
    return $browserify({
            debug: true,
            detectGlobals: false
        })
        .require('./var/build/' + pkg.name, {
            expose: 'bigine'
        })
        .bundle()
        .pipe($source(pkg.version + '.min.js'))
        .pipe($buffer())
        .pipe($smap.init({
            loadMaps: true
        }))
        .pipe($uglify())
        .pipe($smap.write('.'))
        .pipe($gulp.dest('var/build'));
});

$gulp.task('watch', function () {
    return $gulp.watch([
        'lib/**/*.ts',
        '!lib/**/*.d.ts'
    ], ['compile']);
});

$gulp.task('default', ['minify']);
