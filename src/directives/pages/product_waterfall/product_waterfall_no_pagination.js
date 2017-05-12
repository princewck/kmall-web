define(['app', 'css!directives/pages/product_waterfall/product_waterfall.css'], function (app) {
    app.directive('productWaterfallNoPagination', function ($state) {
        return {
            restrict: 'A',
            templateUrl: 'directives/pages/product_waterfall/product_waterfall_no_pagination.html',
            scope: {
                items: '=productWaterfallNoPagination',
            },
            link: function (scope, elements, attrs) {
                scope.items = scope.items || {};
                scope.goToDetail = function (item) {
                    if (localStorage && localStorage.setItem) {
                        localStorage.setItem('p_detail', JSON.stringify(item));
                    }
                    $state.go('productDetail', { id: item.id });
                }
            },
            transclude: true
        }
    });
});