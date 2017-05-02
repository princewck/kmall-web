define(['app', 'configService'], function (app) {
    app.controller('indexController', ['$scope', '$rootScope', 'configService', '$state', '$http', function ($scope, $rootScope, configService, $state, $http) {
        var vm = this;
        var layout = {

        };

        configService.getNavbars().then(function (navs) {
            $scope.navbars = navs;
        });

        configService.getIndexCategoriesOnBanner().then(function (categories) {
            $scope.categories = categories;
        });

        $scope.goProductList = function (category) {
            var groupId = category.id;
            var categories = [];
            var brands = [];
            var query = '';
            return $state.go('productsSearcher', {
                groupId: groupId,
                categories: categories,
                brands: brands,
                query: query
            });
        }


        /* banner slider test*/
        $scope.ksliderImages = [
            { img: 'https://img.alicdn.com/imgextra/i2/129/TB2uQIfbwxlpuFjSszbXXcSVpXa_!!129-0-yamato.jpg_q100.jpg', title: '淘宝', bgc: '#ff3390', link: '#' },
            { img: ' https://img.alicdn.com/tps/i4/TB1O5MhOVXXXXctXXXXSutbFXXX.jpg', title: '淘宝2', bgc: '#d4c79a', link: '#' },
            { img: 'https://img.alicdn.com/imgextra/i2/129/TB2uQIfbwxlpuFjSszbXXcSVpXa_!!129-0-yamato.jpg_q100.jpg', title: '淘宝', bgc: '#ff3390', link: '#' },
            { img: ' https://img.alicdn.com/tps/i4/TB1O5MhOVXXXXctXXXXSutbFXXX.jpg', title: '淘宝2', bgc: '#d4c79a', link: '#' },
            { img: 'https://img.alicdn.com/imgextra/i2/129/TB2uQIfbwxlpuFjSszbXXcSVpXa_!!129-0-yamato.jpg_q100.jpg', title: '淘宝', bgc: '#ff3390', link: '#' },
            { img: ' https://img.alicdn.com/tps/i4/TB1O5MhOVXXXXctXXXXSutbFXXX.jpg', title: '淘宝2', bgc: '#d4c79a', link: '#' },
        ];




        getBlockGroups();
        getBanners();

        function getBanners() {
            $http.get('../api/web/banners').then(function(res) {
                if (res.data.code === 0) {
                    $scope.ksliderImages = res.data.data;
                }
            });
        }

        /**
         * 活动专区
         */
        function getBlockGroups() {
            $http.get('../api/web/blockGroup').then(function (res) {
                if (res.data.code === 0) {
                    $scope.blockGroups = res.data.data.map(function (group) {
                        var _group = angular.copy(group);
                        group.list = group.list.map(function (item) {
                            return {
                                main_pic: item.image,
                                title: item.title,
                                sub_title: item.description,
                                link: item.link
                            }
                        });
                        return group;
                    }).filter(function(item) {
                        return item.list && item.list.length >= 6;
                    });
                }
            });
        }

    }]);
});