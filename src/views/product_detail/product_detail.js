define(['app', 'purchasePanel'], function (app) {
    app.controller('productDetailController', ['$scope', '$http', '$stateParams', '$q', function ($scope, $http, $stateParams, $q) {
        $scope.details = {};
        function loadProductTbkDetail(id) {
            var defer = $q.defer();
            if (!id) {
                defer.resolve({})
            } else {
                if (localStorage && localStorage.getItem) {
                    var productSerialized = localStorage.getItem('p_detail' + id);
                    if (productSerialized) {
                        defer.resolve(angular.fromJson(productSerialized));
                    } else {
                        pullData(id, function (data) {
                            defer.resolve(data);
                        });
                    }
                } else {
                    pullData(id, function (data) {
                        defer.resolve(data);
                    });
                }
            }
            return defer.promise;
        }

        function pullData(id, callback) {
            $http.get('../api/web/product/' + id).then(function (res) {
                if (res.data.code === 0) {
                    if (callback) callback(res.data.data);
                }
            });
        }

        function init(id) {
            $scope.loading = true;
            loadProductTbkDetail(id).then(function (details) {
                if (details.product_image && details.product_image.indexOf('http://') > -1) {
                    details.product_image = details.product_image.replace('http', 'https');
                }
                $scope.details = details;
                console.log(details);
                $scope.loading = false;
            }).catch(function () {
                $scope.loading = false;
            });
        }

        init($stateParams.id);

        $scope.getPriceWithCoupon = function (item) {
            if (!item || !item.price) return '';
            if (Number(item.price) - Number(item.coupon_price) > 0) {
                return Number(Number(item.price) - Number(item.coupon_price)).toFixed(2);
            }
            return Number(item.price).toFixed(2);
        }

        $scope.getDiscount = function (item) {
            if (!item || !item.price) return '';
            var discount = Number((Number(item.price) - Number(item.coupon_price)) / Number(item.price) * 10);
            return discount % 1 ? discount.toFixed(1) : discount.toFixed(0);
        }

        $scope.$on('$stateChangeSuccess', function() {
            document.querySelector('body').scrollIntoView();
        });

    }]);
});