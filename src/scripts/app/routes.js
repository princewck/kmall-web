define(['app'], function(app) {
    app.config(['$stateProvider', '$urlRouterProvider', '$requireProvider', function($stateProvider, $urlRouterProvider, $requireProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider.state('index', {
            url: '/',
            templateUrl: 'views/index/index.html',
            controller: function($scope) {
                alert('首页');
            },
            controllerAs: 'vm',
            resolve: {
                deps: $requireProvider.requireJS(['views/index/index'])
            }
        })
    }]);
});