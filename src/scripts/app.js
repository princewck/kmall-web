define([], function() {
    var app = angular.module('kapp', ['ui.router', 'ngRequire', 'ngAnimate', 'ngCookies']);
    app.run(['$rootScope', function($rootScope) {
           
    }]);

    return app;
})