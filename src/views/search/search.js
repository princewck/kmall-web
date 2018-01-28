define(['app'], function(app) {
    app.controller('searchPageController', ['$scope', '$stateParams', '$http', 'overlayMaker',   function($scope, $stateParams, $http, overlayMaker) {
        $scope.stateParams = $stateParams;
        $scope.result = {};
        var page = $stateParams.page;
        var query = $stateParams.query;
        loadSearchResult();
        function loadSearchResult() {
            var loading = overlayMaker.loading(document.querySelector('#search-page'));
            $http.post('../api/web/products/query/p/' + page, {
                kwd: query
            }).then(function(res) {
                loading.hide();
                if (res.data.code === 0) {
                    var data = res.data.data;
                    data.data = (data.data || []).map(function (p) {
                        if (p.product_image && p.product_image.indexOf('http://') > -1) {
                            p.product_image = p.product_image.replace('http', 'https');
                        }
                        return p;
                    });                    
                    $scope.result = data;
                }
            });
        }
    }]);
});