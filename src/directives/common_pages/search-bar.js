define(['app', 'css!directives/common_pages/search-bar.css'], function(app) {
    app.directive('searchBar', function() {
        return {
            restrict: 'A',
            templateUrl: 'directives/common_pages/search-bar.html',
            controller: function($scope) {
                $scope.placeholder = $scope.placeholder;
            },
            scope: {
                placeholder: '@'
            }
        }
    });
});