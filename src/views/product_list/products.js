define(['app', 'productListFilter'], function (app) {
    app.controller('productsController', ['$scope', '$stateParams', '$state', '$http', 'overlayMaker', '$timeout', function ($scope, $stateParams, $state, $http, overlayMaker, $timeout) {
        $scope.groupId = $stateParams.groupId;
        if (!$scope.groupId) {
            return $state.go('index');
        }
        $scope.categories = $stateParams.categories ? $stateParams.categories.split('&') : [];
        $scope.brands = $stateParams.brands ? $stateParams.brands.split('&') : [];
        $scope.query = $stateParams.query || '';
        $scope.products = [];
        $scope.stateParams = $stateParams;
        initFilter();

        $scope.filter = function (data) {
            var groupId = data.categoryGroupId;
            var categories = data.categoriesChecked.join('&');
            var brands = data.brandsChecked.join('&');
            var query = data.filterQuery || '';
            $state.go('productsSearcher', {
                groupId: groupId,
                categories: categories,
                brands: brands,
                query: query,
                page: 1
            });
        }
        function initFilter() {
            var params = {
                groupId: $scope.groupId,
                kwd: $scope.query,
                brandIds: $scope.brands,
                categoryIds: $scope.categories
            }
            var loading = overlayMaker.loading(document.querySelector('.products-box'));
            $http.post('../api/web/products/query/p/' + ($stateParams.page || 1), params, { headers: { 'Content-Type': 'application/json' } }).then(function (res) {
                if (res.data.code === 0) {
                    loading.hide();
                    if (Number(res.data.data.currentPage) > Number(res.data.data.pages)) {
                        var page = Number(res.data.data.pages);
                        var params = angular.copy($scope.stateParams);
                        params.page = page;
                        $state.go('productsSearcher', params);
                    }
                    $timeout(function () { $scope.products = res.data.data; }, 0);
                } else {
                    console.log(res);
                    $state.go('index');
                }
            });
        }
    }]);
});