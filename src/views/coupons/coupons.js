define(['app', 'couponListFilter'], function (app) {
    app.controller('couponController', ['$scope', '$state', '$stateParams', '$http', 'overlayMaker', function ($scope, $state, $stateParams, $http, overlayMaker) {

        var page = $stateParams.page || 1;

        $scope.groupId = $stateParams.groupId;
        $scope.categories = $stateParams.categories ? $stateParams.categories.split('&') : [];
        $scope.query = $stateParams.query || '';
        $scope.products = [];
        $scope.stateParams = $stateParams;

        $scope.filter = function (data) {
            var groupId = data.groupId;
            var categories = data.categories.join('&');
            var query = data.query || '';
            $state.go('couponsSearcher', {
                page: 1,
                groupId: groupId,
                categories: categories,
                query: query
            });
        }

        $scope.goToDetail = function (item) {
            if (localStorage && localStorage.setItem) {
                localStorage.setItem('p_detail' + item.id, JSON.stringify(item));
            }
            var url = $state.href('productDetail', { id: item.id });
            return url;
        }

        function initFilter() {
            var params = {
                groupId: $scope.groupId,
                kwd: $scope.query,
                categoryIds: $scope.categories,
                hasCoupon: true
            }
            var loading = overlayMaker.loading(document.querySelector('#coupon-container'));
            $http.post('../api/web/products/query/p/' + page, params, { headers: { 'Content-Type': 'application/json' } }).then(function (res) {
                if (res.data.code === 0) {
                    $scope.products = (res.data.data || []).map(function (p) {
                        if (p.product_image && p.product_image.indexOf('http://') > -1) {
                            p.product_image = p.product_image.replace('http', 'https');
                        }
                        return p;
                    });
                } else {
                    $state.go('index');
                }
                loading.hide();
            });
        }

        $scope.getDiscountPrice = function (price, couponText) {
            var p = /\d{1,}/g;
            var arr = couponText.match(p);
            var couponPrice = Math.min.apply(Math, arr);
            return Number(price - couponPrice).toFixed(1);
        }

        $scope.getProgress = function (left, total) {
            return {
                width: (Number(left) / Number(total) * 100) + '%'
            }
        }

        initFilter();

    }]);
});