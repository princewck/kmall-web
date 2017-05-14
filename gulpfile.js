var gulp = require('gulp');
var minify = require('gulp-uglify');
var replace = require('gulp-replace');
var fs = require('fs');
var main = require('./src/scripts/main');
var path = require('path');
var csso = require('gulp-csso');
var concat = require('gulp-concat');
var q = require('q');
var revList = require('gulp-rev-list');
var rename = require('gulp-rename');

//递归删除指定目录
var rmdirSync = (function () {
    function iterator(url, dirs) {
        var stat = fs.statSync(url);
        if (stat.isDirectory()) {
            dirs.unshift(url);//收集目录
            inner(url, dirs);
        } else if (stat.isFile()) {
            fs.unlinkSync(url);//直接删除文件
        }
    }
    function inner(path, dirs) {
        var arr = fs.readdirSync(path);
        for (var i = 0, el; el = arr[i++];) {
            iterator(path + "/" + el, dirs);
        }
    }
    return function (dir, cb) {
        cb = cb || function () { };
        var dirs = [];

        try {
            iterator(dir, dirs);
            for (var i = 0, el; el = dirs[i++];) {
                fs.rmdirSync(el);//一次性删除所有收集到的目录
            }
            cb()
        } catch (e) {//如果文件或目录本来就不存在，fs.statSync会报错，不过我们还是当成没有异常发生
            e.code === "ENOENT" ? cb() : cb(e);
        }
    }
})();

gulp.task('clean', function () {
    var defer = q.defer();
    rmdirSync('./dist', function () {
        // rmdirSync('./temp', function () {
        console.log('清空打包路径success!!!');
        setTimeout(function () {
            defer.resolve();
        }, 2000);
        // });
    });
    return defer.promise;
})


gulp.task('moveAsserts', ['clean'], function () {
    gulp.src('./src/bower_components/**/*')
        .pipe(gulp.dest('./dist/bower_components'));
    gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist/'));
    fs.readdir('./src', function (err, dirs) {
        if (err) throw new Error(err);
        else {
            dirs.forEach(function (dir) {
                //取出index.html
                if (dir.indexOf('.html') >= 0 || dir[0] == '.' || dir == 'bower_components') return;
                (function (dir) {
                    gulp.src([
                        path.resolve('./src', dir, '**/**.html'),
                        path.resolve('./src', dir, '**/**.png'),
                        path.resolve('./src', dir, '**/**.jpg'),
                        path.resolve('./src', dir, '**/**.gif'),
                        path.resolve('./src', dir, '**/**.eot'),
                        path.resolve('./src', dir, '**/**.svg'),
                        path.resolve('./src', dir, '**/**.ttf'),
                        path.resolve('./src', dir, '**/**.woff')
                    ]).pipe(gulp.dest(path.resolve('./dist/', dir)))
                        .on('end', function () {
                            console.log('文件拷贝完成');
                        });
                }(dir)
                );
            });
        }
    });
});

gulp.task('uglifyScripts', ['clean'], function () {
    fs.readdir('./src', function (err, dirs) {
        if (err) throw new Error(err);
        else {
            dirs.forEach(function (dir) {
                //取出index.html
                if (dir.indexOf('.html') >= 0 || dir[0] == '.' || dir == 'bower_components') return;
                (function (dir) {
                    gulp.src([
                        path.resolve('./src', dir, '**/**.js'),
                        path.resolve('./src', dir, '**/**/**.js'),
                    ])
                        .pipe(minify())
                        .pipe(gulp.dest(path.resolve('./dist/', dir)));
                }(dir));
            });
        }
    });
});

gulp.task('compressStyles', ['clean'], function () {
    fs.readdir('./src', function (err, dirs) {
        if (err) throw new Error(err);
        else {
            dirs.forEach(function (dir) {
                //取出index.html
                if (dir.indexOf('.html') >= 0 || dir[0] == '.' || dir == 'bower_components') return;
                (function (dir) {
                    gulp.src([
                        path.resolve('./src', dir, '**/**.css'),
                        path.resolve('./src', dir, '**/**/**.css'),
                    ])
                        .pipe(csso())
                        .pipe(gulp.dest(path.resolve('./dist/', dir)));
                }(dir));
            });
        }
    });
});

gulp.task('default', ['moveAsserts', 'uglifyScripts', 'compressStyles'], function () {
    console.log('所有构建任务完成');
});

gulp.task('revList', function () {
    return gulp.src(['src/**/*.*', '!src/bower_components/**/*.*'])
        .pipe(revList())
        .pipe(revList.manifest('fileHashlist.js', {winval: 'fileHashlist'}))
        // .pipe(rename('fileHashList.js'))
        .pipe(gulp.dest('./src/scripts/'))
        .on('end', function () {
            console.log('hash list generated!');
        })
});


gulp.task('watch', ['default'], function () {
    gulp.watch([
        './src/**/**/*.js',
        './src/**/**/*.css'
    ], ['default']);
});