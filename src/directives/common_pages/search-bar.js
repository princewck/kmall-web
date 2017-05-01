define(['app', 'css!directives/common_pages/search-bar.css'], function(app) {
    app.directive('searchBar', ['$state', function($state) {
        return {
            restrict: 'A',
            templateUrl: 'directives/common_pages/search-bar.html',
            controller: ['$scope', function($scope) {
                $scope.placeholder = $scope.placeholder;

                $scope.search = function(kw) {
                    if (kw) {
                        $state.go('searchPage', {
                            query: kw,
                            page: 1
                        });
                    }
                }

                $scope.searchWithEnter = function(event, kw) {
                    if (event.keyCode === 13) {
                        $scope.search(kw);
                    }
                }

            }],
            link: function(scope, elements, attrs) {
                scope.$watch('getValue()', function(newVal) {
                    if(newVal) scope._searchKeywords = newVal;
                });

                scope.getValue = function() {
                    return attrs.value;
                }
            },
            scope: {
                placeholder: '@'
            }
        }
    }]);
});