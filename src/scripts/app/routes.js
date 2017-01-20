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
        .state('products', {
            url: '/products',
            templateUrl: 'views/product_list/products.html',
            controller: 'productsController',
            resolve: {
                deps: $requireProvider.requireJS([
                    'navbar',
                    'views/product_list/products', 
                    'css!views/product_list/products.css',
                ])
            }
        })
    }]);
});