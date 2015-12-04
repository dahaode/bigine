var $gulp = require('gulp'),
    $lint = require('gulp-tslint'),
    $del = require('del'),
    $smap = require('gulp-sourcemaps'),
    $tsc = require('gulp-typescript'),
    $replace = require('gulp-replace'),
    $insert = require('gulp-insert'),
    $browserify = require('browserify'),
    $source = require('vinyl-source-stream'),
    $buffer = require('vinyl-buffer'),
    $uglify = require('gulp-uglify');

$gulp.task('lint', function () {
    return $gulp.src('lib/**/*.ts')
        .pipe($lint())
        .pipe($lint.report('prose'));
});

$gulp.task('clear', function () {
    $del([
        'var/build/*.*.*.js',
        'var/build/*.*.*.min.js*'
    ]);
});

$gulp.task('dist', function () {
    var pkg = require('./package.json'),
        ts = $gulp.src('lib/Bigine.ts')
            .pipe($smap.init())
            .pipe($tsc($tsc.createProject('tsconfig.json', {
                outFile: pkg.name + '.js'
            })));
    return ts.js
        .pipe($replace(/\$\{BIGINE_VERSION\}/, pkg.version))
        .pipe($insert.prepend('var __Bigine_Util = require("bigine.util");\n'))
        .pipe($insert.append('module.exports=Bigine;'))
        .pipe($smap.write('.'))
        .pipe($gulp.dest('var/build'));
});

$gulp.task('tsd', ['lint'], function () {
    var pkg = require('./package.json'),
        ts = $gulp.src('lib/Bigine.ts')
            .pipe($tsc($tsc.createProject('tsconfig.json', {
                declaration: true,
                removeComments: true
            })));
    return ts.dts
        .pipe($replace('\n', '\n    '))
        .pipe($replace('    /// <', '/// <'))
        .pipe($replace('        import Util = __Bigine_Util;\n', ''))
        .pipe($replace('declare ', ''))
        .pipe($replace(/_raf.d.ts" \/>\n/, "$&declare namespace __Bigine {\n    import Util = __Bigine_Util;\n"))
        .pipe($insert.append('}\n\ndeclare module "bigine" {\n    export = __Bigine.Bigine;\n}\n'))
        .pipe($replace('\n    }\n    }\n', '\n    }\n}\n'))
        .pipe($gulp.dest('.'));
});

$gulp.task('bundle', ['dist'], function () {
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

$gulp.task('minify', ['dist'], function () {
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
    return $gulp.watch('lib/**/*.ts', ['tsd', 'dist']);
});

$gulp.task('default', ['tsd', 'minify']);
