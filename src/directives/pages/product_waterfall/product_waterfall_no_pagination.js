define(['app', 'css!directives/pages/product_waterfall/product_waterfall.css'], function (app) {
    app.directive('productWaterfallNoPagination', ['$state', function ($state) {
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
                    var url = $state.href('productDetail', { id: item.id });
                    return url;
                }

                scope.isToday = function(date) {
                    var d = new Date(date);
                    var year = d.getFullYear();
                    var month = d.getMonth();
                    var day = d.getDate();
                    var now = new Date();
                    return year == now.getFullYear() && month == now.getMonth() && day == now.getDate();
                }
            },
            transclude: true
        }
    }]);
});