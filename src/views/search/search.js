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
                    $scope.result = res.data.data;
                }
            });
        }
    }]);
});