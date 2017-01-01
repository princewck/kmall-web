define(['app', 'css!directives/common_pages/site-footer.css'], function(app) {
    app.directive('siteFooter', function() {
        return {
            restrict: 'A',
            templateUrl: 'directives/common_pages/site-footer.html'
        }
    });
});