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
                    if (brand.logo && brand.logo.indexOf('http://') > -1) {
                        brand.logo = brand.logo.replace('http', 'https');
                    }  
                    if (brand.banner && brand.banner.indexOf('http://') > -1) {
                        brand.banner = brand.banner.replace('http', 'https');
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
                    var data = res.data.data;
                    data.data = (data.data || []).map(function (p) {
                        if (p.product_image && p.product_image.indexOf('http://') > -1) {
                            p.product_image = p.product_image.replace('http', 'https');
                        }
                        return p;
                    });
                    $scope.products = data;
                }
            });
        }
    }]);
});