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
                    'nav-with-logo',
                    'views/product_list/products', 
                    'css!views/product_list/products.css',
                ])
            }
        })
        .state('productsSearcher', {
            url: '/products/g/:groupId/c/:categories/b/:brands/kw/:query/p/:page',
            templateUrl: 'views/product_list/products.html',
            controller: 'productsController',
            resolve: {
                deps: $requireProvider.requireJS([
                    'nav-with-logo',
                    'views/product_list/products', 
                    'css!views/product_list/products.css',
                ])
            }
        }) 
        .state('couponsSearcher', {
            url: '/coupons/:groupId/:categories/:query',
            templateUrl: 'views/coupons/coupons.html',
            controller: 'couponController',
            resolve: {
                deps: $requireProvider.requireJS([
                    'nav-with-logo',
                    'views/coupons/coupons', 
                    'css!views/coupons/coupons.css'
                ])
            }
        }) 

        .state('coupons', {
            url: '/coupons',
            templateUrl: 'views/coupons/coupons.html',
            controller: 'couponController',
            resolve: {
                deps: $requireProvider.requireJS([
                    'nav-with-logo',
                    'views/coupons/coupons', 
                    'css!views/coupons/coupons.css',
                ])
            }
        })
        .state('brandCollection', {
            url: '/brand/collection/:brandId',
            templateUrl: 'views/brand_collection/brand_collection.html',
            controller: 'brandCollectionController',
            resolve: {
                deps: $requireProvider.requireJS([
                    'nav-with-logo',
                    'views/brand_collection/brand_collection',
                    'css!views/brand_collection/brand_collection.css'
                ])
            }
        }) 
        .state('brandList', {
            url: '/brand/list',
            templateUrl: 'views/brand_list/brand_list.html',
            controller: 'brandListController',
            resolve: {
                deps: $requireProvider.requireJS([
                    'nav-with-logo',
                    'views/brand_list/brand_list',
                    'css!views/brand_list/brand_list.css'
                ])
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login/login.html',
            controller: 'loginController',
            resolve: {
                deps: $requireProvider.requireJS([
                    'nav-with-logo',
                    'views/login/login',
                    'css!views/login/login.css'
                ])
            }
        }) 
        .state('register', {
            url: '/register',
            templateUrl: 'views/login/register.html',
            controller: 'registerController',
            resolve: {
                deps: $requireProvider.requireJS([
                    'nav-with-logo',
                    'views/login/register',
                    'css!views/login/register.css'
                ])
            }
        }) 
        .state('forget', {
            url: '/forget',
            templateUrl: 'views/login/forget.html',
            controller: 'accountForgetController',
            resolve: {
                deps: $requireProvider.requireJS([
                    'nav-with-logo',
                    'views/login/forget',
                    'css!views/login/forget.css'
                ])
            }
        })                            
    }]);
});