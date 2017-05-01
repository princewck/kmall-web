define(['app', 'css!directives/pages/product_waterfall/product_waterfall.css'], function (app) {
    app.directive('productWaterfall', function ($state) {
        return {
            restrict: 'A',
            templateUrl: 'directives/pages/product_waterfall/product_waterfall.html',
            scope: {
                items: '=productWaterfall',
                state: '@',
                stateParams: '=',
            },
            link: function (scope, elements, attrs) {
                scope.items = scope.items || {};
                scope.currentPage = scope.items.currentPage || 1;
                var router = attrs.state;
                scope.getPages = function () {
                    var pages = [];
                    var total = scope.items.pages || 0;
                    for (var i = 0; i < total; i++) {
                        pages.push(i+1);
                    }
                    return pages;
                }

                scope.goPage = function (page) {
                    console.log();
                    if (router) $state.go(router, { page: page });
                }
            },
            transclude: true
        }
    });
});