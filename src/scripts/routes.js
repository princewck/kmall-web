define(['app'], function(app) {
    app.config(['$stateProvider', '$urlRouterProvider', '$requireProvider', function($stateProvider, $urlRouterProvider, $requireProvider) {
        console.log('routes');
        $urlRouterProvider.otherwise("/");
        $stateProvider.state('index', {
            url: '/',
            templateUrl: 'views/index/index.html',
            controller: 'indexController',
            controllerAs: 'vm',
            resolve: {
                deps: $requireProvider.requireJS(['views/index/index'])
            }
        })
        .state('home', {
            url: '/home',
            template: '<h2>home</h2>',
            controller: function($scope) {
                alert('home');
            }
        })
    }]);
});