define(['app', 'css!directives/common_pages/slider.css'], function(app) {
    app.directive('kslider', ['$interval', function($interval) {
        return {
            restrict: 'A',
            templateUrl: 'directives/common_pages/slider.html',
            scope: {
                images: '=',
                width: '@',
                height: '@',
                interval:'@'
            },
            link: function(scope, element, attr) {
                var l = scope.images.length;
                var count = 0;
                scope.sliderIndex = 0;
                
                setInterval();
                scope.switchSliderItem = function(index) {
                    scope.sliderIndex = index;
                    $interval.cancel(scope.it);
                    setInterval();
                };

                function setInterval() {
                    scope.it = $interval(function() {
                        if (!l) throw new Error('slider images not specified!!!');
                        count ++;
                        scope.sliderIndex = count%l;
                    }, scope.interval || 3000);                    
                }
            }
        }
    }]);
});