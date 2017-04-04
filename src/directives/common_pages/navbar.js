define(['app', 'css!directives/common_pages/navbar.css', 'configService'], function(app) {
    app.directive('navBar', ['$parse', '$http', 'configService', function($parse, $http, configService) {
        return {
            restrict: 'A',
            templateUrl: 'directives/common_pages/navbar.html',
            transclude:true,
            link: function(scope, element, attrs) {
                configService.getNavbars().then(function(bars) {
                    scope.navbars = bars;
                });
            }
        }
    }]);
});