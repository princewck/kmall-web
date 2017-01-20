define(['app', 'css!directives/pages/guess_like/guess_like.css'], function(app) {
    app.directive('guessLike', function() {
        return {
            restrict: 'A',
            templateUrl: 'directives/pages/guess_like/guess_like.html',
            scope: {
                items: '='
            }        
        }
    });
});