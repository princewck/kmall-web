/**
 * 接收一个一级分类id
 * 输出 一级分类id, 选中的品牌id, 选中的二级分类id, 提供一个回调函数并传入输出结果用于更新搜索
 * api: /web/categoryGroup/:id/categories
 * {
 *      group: {
 *          "id": 5,
 *          "name": "女装/内衣",
 *          "description": "女装，内衣",
 *          "sort": 0,
 *          "status": true,
 *      },
 *      categories: [
 *          {
 *              id:"?", name: "?", image: "??", description: "??", sort: "??",
 *              brands: [...]
 *          }
 *      ]
 * }
 */

define(['app', 'css!./directives/pages/product_filter/product_filter.css'], function (app) {
    app.directive('productListFilter', ['configService', '$http', function (configService, $http) {
        return {
            restrict: 'AE',
            templateUrl: './directives/pages/product_filter/template.html',
            scope: {
                onSelect: '&',
                filterQuery: '@query'
            },
            link: function (scope, elements, attrs) {
                var brands = attrs.brands ? attrs.brands.split(',') : [];
                var categoryGroupId = attrs.categoryGroup;
                var categories = attrs.categories ? attrs.categories.split(',') : [];

                scope.handleBrand = function(checked, index) {
                    // if not checked then check it and search 
                    if (!checked) {
                        scope.brands[index]['checked'] = true;
                        scope.onSelect({data: getData()});    
                    }
                }

                scope.deleteBrand = function(index, event) {
                    scope.brands[index]['checked'] = false;
                    scope.onSelect({data: getData()});
                    event.stopPropagation();
                    return false;
                }

                scope.handleCategory = function(checked, index) {
                    // if not checked then check it and search 
                    if (!checked) {
                        scope.categories[index]['checked'] = true;
                        scope.onSelect({data: getData()});
                    }
                }

                scope.deleteCategory = function(index, event) {
                    scope.categories[index]['checked'] = false;
                    scope.onSelect({data: getData()});
                    event.stopPropagation();
                    return false;
                }                

                scope.searchByQuery = function() {
                    scope.onSelect({data: getData()});
                }

                function getData() {
                    scope.brands = scope.brands || [];
                    var data =  {
                        categoryGroupId: categoryGroupId,
                        categoriesChecked: scope.categories.filter(function(c) {
                            return c.checked;
                        }).map(function(c) {
                            return c.id;
                        }),
                        brandsChecked: scope.brands.filter(function(b) {
                            return b.checked;
                        }).map(function(b) {
                            return b.id;
                        })
                    }
                    if (scope.filterQuery) data.filterQuery =  scope.filterQuery;
                    return data;
                }

                loadCategories(categoryGroupId, categories);
                if (categoryGroupId) {
                    loadBrands(categories, brands);                    
                }

                scope.getCategoriesChecked = function() {
                    if (!scope.categories) return 0;
                    return scope.categories.filter(function(c) {
                        return c.checked;
                    }).map(function(c) {
                        return c.name;
                    }).join(' & ');
                }

                scope.getBrandsChecked = function() {
                    if (!scope.brands) return 0;
                    return scope.brands.filter(function(b) {
                        return b.checked;
                    }).map(function(b) {
                        return b.name;
                    }).join('&');
                }

                function loadCategories(groupId, categoriesSelected) {
                    groupId = groupId || 0;
                    scope.categories = [];
                    scope.group = {};
                    $http.get('../api/web/categoryGroup/'+ groupId +'/categories').then(function (res) {
                        if (res.data.code === 0) {
                            scope.categories = res.data.data.categories.map(function (category) {
                                if (categoriesSelected.indexOf(category.id.toString()) >= 0) {
                                    //被选中的分类
                                    category.checked = true;
                                }
                                return category;
                            });
                            scope.group = res.data.data.group;
                        }
                    });
                }

                /**
                 * 
                 * @param {array} categories
                 * @param {array} selectedBrandIds 
                 */
                function loadBrands(categories, selectedBrandIds) {
                    var params = {};
                    if (categories && categories.length) {
                        params.categoryIds = categories.filter(function (c) {
                            return !isNaN(c.id);
                        }).map(function (c) {
                            return c.id;
                        });
                    }
                    if (categoryGroupId > 0) {
                        $http.get('../api/web/categoryGroup/' + categoryGroupId + '/brands', { params: params }).then(function (res) {
                            if (res.data.code === 0) {
                                var brands = res.data.data;
                                brands = brands.map(function (b) {
                                    if (selectedBrandIds.indexOf(b.id.toString()) >= 0) {
                                        b.checked = true;
                                    }
                                    return b;
                                });
                                scope.brands = brands;
                            }
                        });
                    }
                }

            }
        }
    }]);
});
