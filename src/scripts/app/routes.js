define(['app'], function(app) {
    app.config(['$stateProvider', '$urlRouterProvider', '$requireProvider', function($stateProvider, $urlRouterProvider, $requireProvider) {
        $urlRouterProvider.otherwise("/404");
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
            url: '/brand/collection',
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
        .state('404', {
            url: '/404',
            templateUrl:'views/common/404.html',
            resolve: {
                deps: $requireProvider.requireJS(['css!views/common/404', 'nav-with-logo'])
            },
            controller: function($scope) {
                $scope.navBarList = [
                    {title: '天猫超市', url: '#/'},
                    {title: '天猫国际', url: '#/'},
                    {title: '天猫会员', url: '#/'},
                    {title: '品牌节', url: '#/'},
                    {title: '电器城', url: '#/'},
                    {title: '喵先生', url: '#/'},
                    {title: '医药馆', url: '#/'},
                    {title: '营业厅', url: '#/'},
                    {title: '天天9块9', url: '#/'},
                ];
            }
        });       
    }]);
});