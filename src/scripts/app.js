define([], function () {
    var app = angular.module('kapp', ['ui.router', 'ngRequire', 'ngAnimate', 'ngCookies', 'ngTouch']);

    app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('!');
    }]);

    app.run(['$rootScope', function ($rootScope) {

    }]);

    return app;
});