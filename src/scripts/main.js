var BOWER_DIR = './bower_components';
require.config({
    baseUrl: './',
    //为文件添加小尾巴
    // urlArgs:"version=0.5.0",
    waitSeconds: 0,
    paths: {
        'angular': BOWER_DIR + '/angular/angular.min',
        'angular-animate': BOWER_DIR + '/angular-animate/angular-animate.min',
        'angular-moment': BOWER_DIR + '/angular-moment/angular-moment.min',
        'angular-require': BOWER_DIR + '/angular-require/angular-require.min',
        'angular-ui-router': BOWER_DIR + '/angular-ui-router/release/angular-ui-router.min',
        'angular-cookie':"http://cdn.bootcss.com/angular.js/1.4.6/angular-cookies.min",
        'jquery': BOWER_DIR + '/jquery/dist/jquery.min',
        'moment': BOWER_DIR + '/moment/min/moment.min',
        //项目相关
        'app': './scripts/app',
        'routes': './scripts/app/routes',
        'intercepter': './scripts/app/intercepter'
    },
    map: {
        '*': {
            'css': 'http://apps.bdimg.com/libs/require-css/0.1.8/css.min.js' // or whatever the path to require-css is
        }
    },
    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angular-ui-router': {
            deps: ['angular'],
            exports: 'ui-router'
        },
        'angular-moment': {
            deps: ['angular', 'moment'],
            exports: 'angular-moment'
        },
        'angular-require': {
            deps: ['angular'],
            exports: 'angular-require'
        },
        'angular-animate': {
            deps: ['angular'],
        },
        'angular-cookie': {
            deps: ['angular']
        },
        'app': {
            //files to be load before start
            deps: ['angular', 'angular-ui-router', 'angular-require', 'angular-animate', 'angular-cookie'],
            exports: 'app'
        }
    }
});
//require错误处理,否则默认会去访问官网,国外很慢
require.onError = function(err){
    console.log("require error:",err,arguments);
}

requirejs(['app'], function() {
    console.log('callback');
    requirejs(['routes', 'intercepter'], function() {
        angular.bootstrap(document, ['kapp']);
    });
});
