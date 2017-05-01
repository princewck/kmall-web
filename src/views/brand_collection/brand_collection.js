define(['app'], function(app) {
    app.controller('brandCollectionController', ['$scope', '$stateParams', '$state', '$http', 'overlayMaker', function($scope, $stateParams, $state, $http, overlayMaker){
        var brandId = parseInt($stateParams.brandId);
        var page = $stateParams.page || 1;
        $scope.stateParams = $stateParams;
        if (!brandId) return $state.go('index');

        getBrand(brandId);
        getProductsByBrand(brandId);



        function getBrand(brandId) {
            $http.get('../api/web/brand/' + brandId ).then(function(res) {
                if (res.data.code === 0) {
                    var brand = res.data.data;
                    var images = angular.fromJson(brand.image);
                    if (images && images.banners && images.banners.length) {
                        brand.banner = images.banners[0];
                    }
                    if (images && images.logos && images.logos.length) {
                        brand.logo = images.logos[0];
                    }                    
                    $scope.brand = brand;
                }
            });
        }

        function getProductsByBrand(brandId) {
            $scope.products = [];
            var loading = overlayMaker.loading(document.querySelector('#brand-collection'));
            $http.get('../api/web/brand/'+ brandId +'/products/p/'+ page).then(function(res) {
                if (res.data.code === 0) {
                    loading.hide();
                    $scope.products = res.data.data;
                }
            });
        }
    }]);
});