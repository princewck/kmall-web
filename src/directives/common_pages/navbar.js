define(['app', 'css!directives/common_pages/navbar.css'], function(app) {
    app.directive('navBar', ['$parse', function($parse) {
        return {
            restrict: 'A',
            templateUrl: 'directives/common_pages/navbar.html',
            transclude:true,
            link: function(scope, element, attrs) {
                console.log($parse(attrs.navBar)(scope));
                scope.anchors = attrs.navBar ? ($parse(attrs.navBar)(scope) || [{title: '首页', url: '#/'}]) 
                                :[{title: '首页', url: '#/'}];
            }
        }
    }]);
});