define(['app'], function(app) {
    app.service('configService', ['$http', '$q', function($http, $q) {

        /**
         * 获取导航链接
         */
        function getNavs() {
            var defer = $q.defer();
            var navbars = [];
            $http.get('../api/web/navbars').then(function(res) {
                if (res.data.code === 0) {
                    defer.resolve(res.data.data.sort(function(f, l) {
                        return Number(f.sort) - Number(l.sort);
                    }));
                }
                defer.resolve([]);
            });
            return defer.promise;
        }

        function getIndexCategoriesOnBanner() {
            var defer = $q.defer();
            var categories = [];
            $http.get('../api/web/categoryGroups/onbanner').then(function(res) {
                if (res.data.code === 0) {
                    defer.resolve(res.data.data.sort(function(f, l) {
                        return Number(f.sort) - Number(l.sort);
                    }));
                } else {
                    defer.resolve([]);
                }
            });
            return defer.promise;
        }



        return {
            getNavbars: getNavs,
            getIndexCategoriesOnBanner: getIndexCategoriesOnBanner
        }
    }]);
});