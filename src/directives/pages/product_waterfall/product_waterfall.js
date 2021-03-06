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
                scope.items.data = (scope.items.data || []).map(function (item) {
                    if (item.product_image && item.product_image.indexOf('http://') > -1) {
                        item.product_image = item.product_image.replace('http', 'https');
                    }
                    return item;
                });                
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
                    return $state.href('productDetail', {id: item.id});
                }

                scope.isToday = function(date) {
                    var d = new Date(date);
                    var year = d.getFullYear();
                    var month = d.getMonth();
                    var day = d.getDate();
                    var now = new Date();
                    return year == now.getFullYear() && month == now.getMonth() && day == now.getDate();
                }

                scope.getDiscountRate = function(item) {
                    var price = item.price;
                    var newPrice = item.price - Number(item.coupon_price);
                    if (newPrice < 0) return -1;
                    var rate = Number(Number(newPrice/price)*10).toFixed(1);
                    return rate;
                }          
            },
            transclude: true
        }
    }]);
});