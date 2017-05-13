var gulp = require('gulp');
var minify = require('gulp-uglify');
var replace = require('gulp-replace');
var fs = require('fs');
var main = require('./src/scripts/main');
var path = require('path');
var csso = require('gulp-csso');
var concat = require('gulp-concat');
var q = require('q');

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
        rmdirSync('./temp', function () {
            console.log('清空打包路径success!!!');
            defer.resolve();
        });
    });
    return defer.promise;
})


gulp.task('moveAsserts', ['clean'], function () {
    gulp.src('./src/bower_components/**/*')
        .pipe(gulp.dest('./dist/bower_components'));
    gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist/'));
    var deferArray = [];
    fs.readdir('./src', function (err, dirs) {
        if (err) throw new Error(err);
        else {
            dirs.forEach(function (dir) {
                //取出index.html
                if (dir.indexOf('.html') >= 0 || dir[0] == '.' || dir == 'bower_components') return;
                deferArray.push(
                    (function (dir) {
                        let defer = q.defer();
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
                            defer.resolve();
                            console.log('文件拷贝完成');
                        });
                        return defer.promise;
                    }(dir))
                );
            });
        }
    });
    q.all(deferArray).then(function () {
        console.log('---------------------------------');
        console.log(deferArray);
        setTimeout(function() {
            replaceMainJs();
        }, 5000);
        console.log('---------------------------------');
    });
});

gulp.task('uglifyScripts', ['clean'], function () {
    // gulp.src('./src/common/**/**.js')
    //     .pipe(minify())
    //     .pipe(gulp.dest('./dist/src/common'));
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
    // gulp.src('./src/common/**/**.css')
    //     .pipe(csso())
    //     .pipe(gulp.dest('./dist/src/common'));
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

gulp.task('firstScreen', ['clean'], function () {
    console.log('打包首屏公共文件');
    packFirstPageFiles();
});

//替换main.js为打包合并后的文件
function replaceMainJs() {
    gulp.src('./src/scripts/main.js')
        .pipe(replace(/requirejs\(config.homeDeps/, 'requirejs([\'./scripts/first-page\', \'css!./styles/first-page.css\']'))
        .pipe(minify())
        .pipe(gulp.dest('./dist/scripts'))
        .on('end', () => { console.log('main.js generated successfully!') });
}

gulp.task('default', ['moveAsserts', 'uglifyScripts', 'compressStyles', 'firstScreen'], function () {
    console.log('所有构建任务完成');
});

/**
 * bastPath 路径前缀 './dist', './temp'
 * requirejs 的 config 文件内容，获取其中的paths和shim
 * dest 输出目录
 */
function packFirstPageFiles() {
    var config = main.config;
    var commons = main.homeDeps;
    var scripts = [];
    var scriptsWillNotHandled = [];
    var styles = [];
    Object.keys(main.config.paths).forEach(function (moduleId) {
        var script = main.config.paths[moduleId];
        if (script && new RegExp(/\.\/bower_components/).test(script)) {
            scriptsWillNotHandled.push(script);
        } else if (script && new RegExp(/^css\!/g).test(script)) {
            styles.push(script);
        } else if (script && new RegExp(/^\.\//g).test(script)) {
            scripts.push({
                id: moduleId,
                path: script
            });
        }
        if (main.config.shim[moduleId] && main.config.shim[moduleId]['deps']) {
            var deps = main.config.shim[moduleId]['deps'];
            deps.forEach(function (dep) {
                (function (dep) {
                    console.log(dep);
                    if (new RegExp(/\.\/bower_components/).test(dep)) {
                        //是自定义的js路径
                        scriptsWillNotHandled.push(dep);
                    } else if (new RegExp(/^css\!/g).test(dep)) {
                        //是css
                        console.log('是css');
                        styles.push(dep);
                    } else if (new RegExp(/^\.\//g).test(dep)) {
                        //是其他模块
                        (main.config.paths[dep])
                            &&
                            scripts.push({
                                id: dep,
                                path: main.config.paths[dep]
                            });
                    }
                }(dep));
            });
        }
    });
    var promiseArr = [];
    scripts.forEach(function (script) {
        (function (script) {
            console.log(script.id, script.path);
            var dest = './temp/scripts';
            if (script.id == 'app') dest = './temp/entry';
            promiseArr.push(addModuleId(script.id, script.path, './src', dest));
        }(script));
    });
    q.all(promiseArr).then(function () {
        //临时文件全部生成了，开始压缩打包
        fs.readdir(path.resolve('./temp/scripts'), function (err, dirs) {
            if (err) throw new Error(err);
            console.log(dirs);
        });
        console.log('临时文件全部生成了，开始压缩打包');
        var blobSources = scriptsWillNotHandled.map((s) => s + '.js').concat(['./temp/entry/**.js','./temp/scripts/**.js']);
        console.log('blobSources', blobSources);
        console.log('----合并以下js文件-----');
        console.log(blobSources);
        gulp.src(blobSources)
            // .pipe(minify())
            .pipe(concat('first-page.js'))
            .pipe(gulp.dest('./dist/scripts'));

        console.log('样式文件', styles.map((s) => path.resolve('./src', s.replace('css!', ''))));
        gulp.src(styles.map((s) => path.resolve('./src/', s.replace('css!', ''))))
            .pipe(concat('first-page.css'))
            .pipe(csso())
            .pipe(gulp.dest('./dist/styles/'))
            .on('end', function () {
                console.log('合并首屏公用样式文件完成');
            });
    });
}

function addModuleId(id, filePath, basePath, destPath, callback) {
    console.log(arguments);
    var defer = q.defer();
    var patten = /.+\.js/ig;
    var _path = path.resolve(basePath, filePath);
    var cssFilePatern = /^css\!/ig
    _path = _path + '.js';
    gulp.src(_path)
        .pipe(replace(/define(.*)\((.*)\[/g, 'define(\'' + id + '\',['))
        .pipe(gulp.dest(destPath))
        .on('end', function () {
            console.log('end');
            defer.resolve();
        });
    callback && callback();
    return defer.promise;
}

