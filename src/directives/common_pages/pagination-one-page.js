define(['app'], function (app) {
    /**
     * 分页组件, 不切换state, 直接调接口翻页
     */
    app.directive('kPaginationOnePage', ['$state', function ($state) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                pagination: '=kPagination',
                goToPage: '&'
            },
            templateUrl: 'directives/common_pages/pagination.html',
            link: function (scope) {
                // scope.goToPage = function (p) {
                //     var totalPages = Number(scope.pagination.pages) || 1;
                //     var params = angular.copy(scope.stateParams);
                //     params.page = p <= totalPages ? p : totalPages;
                //     $state.go(scope.state, params);
                // };

                scope.lastPage = function () {
                    var p = Number(scope.pagination.currentPage);
                    scope.goToPage({page: p - 1});
                }

                scope.nextPage = function () {
                    var p = Number(scope.pagination.currentPage);
                    scope.goToPage({page: p + 1});
                }

                scope.fastGoByEnter = function(event, page) {
                    if (event.keyCode == 13) {
                        scope.goToPage({page: page});
                    }
                }

                scope.getPageList = function () {
                    if (!scope.pagination || !scope.pagination.pages) return[];
                    var totalPages = Number(scope.pagination.pages) || 1;
                    var currentPage = Number(scope.pagination.currentPage) || 1;
                    var pages = [currentPage];
                    for (var i = 1; i <= 6; i++) {
                        if (i % 2 != 0 && (currentPage - Math.ceil(i / 2) > 0)) {
                            pages.unshift(currentPage - Math.ceil(i / 2));
                        }
                        if (i % 2 == 0 && (currentPage + i / 2 <= totalPages && totalPages > 1)) {
                            pages.push(currentPage + i / 2);
                        }
                    }
                    return pages;
                }

                scope.getPageListLast = function () {
                    if (!scope.pagination || !scope.pagination.pages) return[];
                    var totalPages = Number(scope.pagination.pages) || 1;
                    var lastPages = [];
                    for (var i = 0; i < 3; i++) {
                        if (totalPages - i > 0) {
                            lastPages.unshift(totalPages - i);
                        }
                    }
                    var formerPageList = scope.getPageList();
                    return lastPages.filter(function (p) {
                        return formerPageList.indexOf(p) < 0;
                    });
                }
            }
        }
    }]);
});