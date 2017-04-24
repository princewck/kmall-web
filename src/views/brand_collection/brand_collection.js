define(['app'], function(app) {
    app.controller('brandCollectionController', ['$scope', '$stateParams', '$state', '$http', function($scope, $stateParams, $state, $http){
        var brandId = parseInt($stateParams.brandId);
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
            $http.get('../api/web/brand/'+ brandId +'/products').then(function(res) {
                if (res.data.code === 0) {
                    $scope.products = res.data.data;
                }
            });
        }

        /* `you may like` block test data */
        var items = [];
        for(var i=20;i;i--) {
            items.push({title: 'Zbird/钻石小鸟18K金钻石戒指婚戒订婚结婚求婚钻戒女款正品-丝缠', price: 999, image:'images/product_demo.jpg', link:'https://detail.tmall.com/item.htm?spm=875.7931836/A.20161011.16.VuHLsM&abtest=_AB-LR845-PR845&pvid=c1e5c033-8405-4244-8a1b-f8b9e890af7e&pos=16&abbucket=_AB-M845_B2&acm=201509290.1003.1.1286473&id=19133990782&scm=1007.12710.67270.100200300000000'});
        }
        $scope.items = items;



    }]);
});