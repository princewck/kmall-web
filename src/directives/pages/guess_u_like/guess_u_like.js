define(['app', 'css!directives/pages/guess_u_like/guess_u_like.css'], function(app) {
    app.directive('guessULike', function() {
        return {
            restrict: 'A',
            templateUrl:'directives/pages/guess_u_like/guess_u_like.html'
        }
    });
});