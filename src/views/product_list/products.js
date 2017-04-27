define(['app', 'productListFilter'], function(app) {
    app.controller('productsController', ['$scope', '$stateParams', '$state', '$http', 'overlayMaker', '$timeout', function($scope, $stateParams, $state, $http, overlayMaker, $timeout) {
        $scope.groupId = $stateParams.groupId;
        if(!$scope.groupId) {
            return $state.go('index');
        }
        $scope.categories = $stateParams.categories ? $stateParams.categories.split('&')  : [];
        $scope.brands = $stateParams.brands ? $stateParams.brands.split('&'): [];
        $scope.query = $stateParams.query || '';
        $scope.products = [];
        initFilter();

        $scope.filter = function(data) {
            var groupId = data.categoryGroupId;
            var categories = data.categoriesChecked.join('&');
            var brands = data.brandsChecked.join('&');
            var query = data.filterQuery || '';
            $state.go('productsSearcher', {
                groupId: groupId,
                categories: categories,
                brands: brands,
                query: query
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
            $http.post('../api/web/products/query/p/'+ ($stateParams.page||1), params, {headers: {'Content-Type': 'application/json'}}).then(function(res) {
                if (res.data.code === 0) {
                    loading.hide();
                    $timeout(function(){$scope.products = res.data.data;},0);
                } else {
                    console.log(res);
                    $state.go('index');
                }
            });
        }


        /* `you may like` block test data */
        var items = [];
        for(var i=20;i;i--) {
            items.push({product_name: 'Zbird/钻石小鸟18K金钻石戒指婚戒订婚结婚求婚钻戒女款正品-丝缠', price: 999, product_image:'images/product_demo.jpg', share_url:'https://detail.tmall.com/item.htm?spm=875.7931836/A.20161011.16.VuHLsM&abtest=_AB-LR845-PR845&pvid=c1e5c033-8405-4244-8a1b-f8b9e890af7e&pos=16&abbucket=_AB-M845_B2&acm=201509290.1003.1.1286473&id=19133990782&scm=1007.12710.67270.100200300000000'});
        }
        $scope.guessItems = items;
    }]);
});