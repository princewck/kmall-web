define([], function () {
    var app = angular.module('kapp', ['ui.router', 'ngRequire', 'ngAnimate', 'ngCookies', 'ngTouch']);

    app.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('!');
    }]);

    app.run(['$rootScope', '$state', '$compile',  function ($rootScope, $state) {
        $rootScope.isState = $state.is;

        $rootScope.$on('$stateChangeSuccess', function(){
            console.log(arguments);
        });

    }]);

    return app;
});