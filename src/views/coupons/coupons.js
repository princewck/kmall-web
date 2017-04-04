define(['app', 'couponListFilter'], function(app) {
    app.controller('couponController',  ['$scope', '$state', '$stateParams', '$http', function($scope, $state, $stateParams, $http) {

        $scope.groupId = $stateParams.groupId;
        $scope.categories = $stateParams.categories ? $stateParams.categories.split('&')  : [];
        $scope.query = $stateParams.query || '';
        $scope.products = [];

        $scope.filter = function(data) {
            var groupId = data.groupId;
            var categories = data.categories.join('&');
            var query = data.query || '';
            $state.go('couponsSearcher', {
                groupId: groupId,
                categories: categories,
                query: query
            });
        }

        function initFilter() {
            var params = {
                groupId: $scope.groupId,
                kwd: $scope.query,
                categoryIds: $scope.categories,
                hasCoupon: true
            }
            $http.post('../api/web/products/query', params, {headers: {'Content-Type': 'application/json'}}).then(function(res) {
                if (res.data.code === 0) {
                    $scope.products = res.data.data
                } else {
                    console.log(res);
                    $state.go('index');
                }
            });
        }

        $scope.getDiscountPrice = function(price, couponText) {
            var p = /\d{1,}/g;
            var arr = couponText.match(p);
            var couponPrice = Math.min.apply(Math, arr);
            return Number(price - couponPrice).toFixed(1);
        }

        $scope.getProgress = function(left, total) {
            return {
                width: left/total*100 + '%'
            }
        }

        initFilter();



        
        /* `you may like` block test data */
        var items = [];
        for(var i=20;i;i--) {
            items.push({title: 'Zbird/钻石小鸟18K金钻石戒指婚戒订婚结婚求婚钻戒女款正品-丝缠', price: 999, image:'images/product_demo.jpg', link:'https://detail.tmall.com/item.htm?spm=875.7931836/A.20161011.16.VuHLsM&abtest=_AB-LR845-PR845&pvid=c1e5c033-8405-4244-8a1b-f8b9e890af7e&pos=16&abbucket=_AB-M845_B2&acm=201509290.1003.1.1286473&id=19133990782&scm=1007.12710.67270.100200300000000'});
        }
        $scope.guessItems = items;        
        
    }]);
});