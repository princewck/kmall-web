define(['app', 'css!directives/pages/product_waterfall/product_waterfall.css'], function (app) {
    app.directive('productWaterfall', ['$state', function ($state) {
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
                    if (router) $state.go(router, { page: page });
                }

                scope.goToDetail = function(item) {
                    if (localStorage && localStorage.setItem) {
                        localStorage.setItem('p_detail' + item.id, JSON.stringify(item));
                    }
                    $state.go('productDetail', {id: item.id});
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