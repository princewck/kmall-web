define(['app', 'css!directives/common_pages/header.css'], function(app) {
    app.directive('headerSiteNav', function() {
        return {
            restrict:'A',
            templateUrl: 'directives/common_pages/header.html',
            link: function($scope) {
                $scope.activeQuickMenuItem = null;
                $scope.mouseenter = function(index) {
                    $scope.activeQuickMenuItem = index;
                }
                $scope.mouseleave = function() {
                    $scope.activeQuickMenuItem = null;
                }
            }
        }
    });
});