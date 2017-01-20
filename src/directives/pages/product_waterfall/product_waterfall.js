define(['app', 'css!directives/pages/product_waterfall/product_waterfall.css'], function(app) {
    app.directive('productWaterfall', function() {
        return {
            restrict: 'A',
            templateUrl:'directives/pages/product_waterfall/product_waterfall.html',
            scope: {
                items: '='//items should look like {title: 'xx', price: 1.00, image:'xxx', link:'xxx'}
            },
            transclude: true
        }
    });
});