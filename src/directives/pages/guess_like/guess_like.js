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
                            var result = [];
                            var list = res.data.data.data;
                            //随机取20个做为猜你喜欢结果
                            for(var i =0 ; i < 20 && i<list.length; i++) {
                                var data = list.splice(Math.floor(Math.random()*list.length), 1)[0];
                                result.push(data);
                            }
                            res.data.data.data = result;
                            loading.hide();
                            var data = res.data.data;
                            data.data = (data.data || []).map(function (p) {
                                if (p.product_image && p.product_image.indexOf('http://') > -1) {
                                    p.product_image = p.product_image.replace('http', 'https');
                                }
                                return p;
                            });
                            scope.result = data;
                        }
                    });
                }
            }    
        }
    }]);
});