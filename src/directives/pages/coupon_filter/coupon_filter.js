define(['app',
    'css!./directives/pages/coupon_filter/coupon_filter.css'
], function (app) {
    app.directive('couponListFilter', ['$http', '$timeout', function ($http, $timeout) {
        return {
            restrict: 'AE',
            templateUrl: './directives/pages/coupon_filter/coupon_filter.html',
            scope: {
                onSelect: '&',
                filterQuery: '@query'
            },
            link: function (scope, elements, attrs) {
                var groupId = attrs.groupId || 0;//选中的分组
                scope.showAll = !Boolean(Number(groupId));
                var categories = attrs.categories ? attrs.categories.split(',') : [];//选中的分类
                var query = attrs.query;//搜索词
                loadGroups();
                onSelect = angular.isFunction(scope.onSelect) ? scope.onSelect : angular.noop();
                function loadGroups() {
                    $http.get('../api/web/categoryGroups/onbanner').then(function (res) {
                        if (res.data.code === 0) {
                            scope.groups = res.data.data.map(function (g) {
                                if (g.id.toString() == groupId) {
                                    g.checked = true;
                                    scope.categories = g.categories.map(function (c) {
                                        if (categories.indexOf(c.id.toString()) >= 0) {
                                            c.checked = true;
                                        }
                                        return c;
                                    });
                                }
                                return g;
                            });
                            if (!Number(groupId)) {
                                var _categories = [];
                                var map = {};
                                scope.groups.forEach(function (g) {
                                    g.categories.forEach(function (c) {
                                        if (!map[c.id]) {
                                            map[c.id] = c;
                                            _categories.push(c);
                                        }
                                    });
                                });
                                scope.categories = _categories.map(function (c) {
                                    if (categories.indexOf(c.id.toString()) >= 0) {
                                        c.checked = true;
                                    }
                                    return c;
                                });
                            }
                        }
                    });
                }

                scope.handleGroup = function (checked, group) {
                    if (!checked) {
                        scope.groups.forEach(function (g) {
                            if (g.id != group.id) {
                                g['_checked'] = false;
                            }
                        });
                        group['_checked'] = true;
                        var groups = angular.copy(scope.groups).map(function(g) {
                            if (g.hasOwnProperty('_checked')) {
                                g.checked = g._checked;
                            }
                            return g;
                        });
                        onSelect({ data: getData(groups) });
                    }
                }

                scope.deleteGroup = function (index, event) {
                    scope.groups[index]['checked'] = false;
                    onSelect({ data: getData() });
                    return event.stopPropagation(), false;
                }

                scope.handleCategory = function (checked, index) {
                    console.log(JSON.stringify(arguments));
                    if (!checked) {
                        scope.categories[index]['_checked'] = true;
                        var categories = angular.copy(scope.categories).map(function(category) {
                            if (category.hasOwnProperty('_checked')) category.checked = category._checked;
                            return category;
                        });
                        onSelect({ data: getData(null, categories) });
                    }
                }

                scope.deleteCategory = function (index, event) {
                    scope.categories[index]['checked'] = false;
                    onSelect({ data: getData() });
                    return event.stopPropagation(), false;
                }

                function getData(groups, categories) {
                    var _groups = groups || scope.groups;
                    var _categories = categories || scope.categories;
                    var groupIds = _groups
                        .filter(function (g) { return g.checked })
                        .map(function (g) {
                            return g.id;
                        });
                    var groupId = groupIds.length ? groupIds[0] : 0;
                    return {
                        groupId: groupId,
                        categories: _categories.filter(function (c) {
                            return c.checked;
                        }).map(function (c) {
                            return c.id;
                        }),
                        query: scope.filterQuery || ''
                    }
                }

                scope.searchByQuery = function() {
                    onSelect({ data: getData() });
                }

            }
        }
    }]);
}); 