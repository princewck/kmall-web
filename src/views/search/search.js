define(['app'], function(app) {
    app.controller('searchPageController', ['$scope', '$stateParams', '$http',  function($scope, $stateParams, $http) {
        $scope.stateParams = $stateParams;
        $scope.result = {};
        var page = $stateParams.page;
        var query = $stateParams.query;
        loadSearchResult();
        function loadSearchResult() {
            $http.post('../api/web/products/query/p/' + page, {
                kwd: query
            }).then(function(res) {
                if (res.data.code === 0) {
                    $scope.result = res.data.data;
                }
            });
        }
    }]);
});