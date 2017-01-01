define(['app'], function(app) {
    app.config(['$stateProvider', '$urlRouterProvider', '$requireProvider', function($stateProvider, $urlRouterProvider, $requireProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
        .state('index', {
            url: '/',
            templateUrl: 'views/index/index.html',
            controller: 'indexController',
            resolve: {
                deps: $requireProvider.requireJS(['views/index/index', 'css!views/index/index.css'])
            }
        })
        //common pages
    }]);
});