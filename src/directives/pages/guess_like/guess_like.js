define(['app', 'css!directives/pages/guess_like/guess_like.css'], function(app) {
    app.directive('guessLike', ['$http', 'overlayMaker', function($http, overlayMaker) {
        return {
            restrict: 'A',
            templateUrl: 'directives/pages/guess_like/guess_like.html',
            link: function(scope, elements, attrs) {
                scope.result = {};
                loadData(1);

                scope.$on('goToGuessLikePage', function(ev, data) {
                   loadData(data);
                });

                function loadData(page) {
                    var loading = overlayMaker.loading(document.querySelector('#guess-like'));
                    $http.get('../api/web/products/promotions/'+ page).then(function(res) {
                        if (res.data.code === 0) {
                            loading.hide();
                            scope.result = res.data.data;
                            console.log(scope.result);
                        }
                    });
                }
            }    
        }
    }]);
});