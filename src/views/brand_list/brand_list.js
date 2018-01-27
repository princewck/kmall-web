define(['app'], function(app) {
    app.controller('brandListController', ['$scope', '$interval', '$http', '$state', function($scope, $interval, $http, $state) {
        var vm = this;
        init();

        $scope.goToBrand = function(brandId) {
            return $state.go('brandCollection', {brandId: brandId});
        }

        function https(url) {
            return url && url.indexOf('http://') > -1 && url.replace('http', 'https') || url;
        }


        function init() {
            $scope.brands = [];
            $http.get('../api/web/brands').then(function(res) {
                if (res.data.code === 0) {
                    var banners = res.data.data.map(function(b) {
                        var images = angular.fromJson(b.image);
                        b.logo = (images.logos && images.logos.length) ? images.logos[0] : 
                        null;
                        b.banner = (images.banners && images.banners.length) ? images.banners[0] : null;
                        b.smallBanner = (images.smallBanners && images.smallBanners.length) ? images.smallBanners[0] : null;
                        b.logo = https(b.logo);
                        b.banner = https(b.banner);
                        b.smallBanner = https(b.smallBanner);
                        return b;
                    }).filter(function(b) {
                        return b.logo && b.banner && b.smallBanner;
                    });
                    $scope.brands = banners;
                    initShowcaseData();
                }
            });
        }

        // /*测试数据 图片比例2:1*/
        // var showcaseItems = [];
        // for(var i=35; i; i--) {
        //     showcaseItems.push({
        //         img:'http://gju1.alicdn.com/tps/i2/1636305000555101208/TB2KiKzdOBnpuFjSZFzXXaSrpXa_!!2-juitemmedia.png_100x100.jpg', 
        //         url:'http://gju1.alicdn.com/tps/i2/1636305000555101208/TB2KiKzdOBnpuFjSZFzXXaSrpXa_!!2-juitemmedia.png_100x100.jpg', 
        //         title:'小标题'
        //     });
        // }

        function initShowcaseData() {
            $scope.showcaseItems = groupBrandLogos($scope.brands);
            $scope.brandLogoPage = 0;
            vm.switchShowcase = $interval(function() {
                $scope.brandLogoPage = ($scope.brandLogoPage + 1) % $scope.showcaseItems.length;
            }, 5000);
        }

        $scope.$on('$destroy', function() {
            $interval.cancel(vm.switchShowcase);
        });

        // /*brand logos 测试数据*/
        // var brandBanners = [];
        // for (i = 0; i < 10; i++) {
        //     var data1 = {
        //         logo:'http://gju3.alicdn.com/tps/i4/1198405000280052808/TB2.hUHcNdkpuFjy0FbXXaNnpXa_!!2-juitemmedia.png_100x100.jpg',
        //         banner:'http://gju2.alicdn.com/tps/i4/1000005000522777454/TB24o1DcYXlpuFjy1zbXXb_qpXa_!!0-0-jupush.jpg',
        //         link: 'http://baidu.com',
        //         desc: '恒源祥年末清仓，全场低至2折，买三送一',
        //         time: '距结束还剩：10小时6分45秒',
        //         slogon: '[恒源祥]年末清仓买3送1',
        //         total_number: '96'
        //     },
        //     data2 = {
        //         logo: 'http://gju2.alicdn.com/tps/i3/188060355563219335/TB2PLt4c80kpuFjSsziXXa.oVXa_!!2-juitemmedia.png_100x100.jpg',
        //         banner:'http://gju2.alicdn.com/tps/i1/1000005000525433966/TB25oawcYXlpuFjSszfXXcSGXXa_!!0-0-jupush.jpg',
        //         link: 'http://baidu.com',
        //         desc: '恒源祥年末清仓，全场低至2折，买三送一',
        //         time: '距结束还剩：10小时6分45秒',
        //         slogon: '[MiiOW/猫人]年前最后一波发货',
        //         total_number: '106'                
        //     },
        //     data3 = {
        //         logo: 'http://gju3.alicdn.com/tps/i4/167070354720642167/TB2TqFKdtRopuFjSZFtXXcanpXa_!!2-juitemmedia.png_100x100.jpg',
        //         banner:'http://gju1.alicdn.com/tps/i3/1000005000414929240/TB2udedc9FjpuFjSszhXXaBuVXa_!!0-0-jupush.jpg',
        //         link: 'http://baidu.com',
        //         desc: '恒源祥年末清仓，全场低至2折，买三送一',
        //         time: '距结束还剩：10小时6分45秒',
        //         slogon: '[KUKa/顾家家居]顾家年置新春',
        //         total_number: '134'                  
        //     };
        //     brandBanners.push(data1, data2, data3);
        // }
        // $scope.brandBanners = brandBanners;



        function groupBrandLogos(logos) {
            if (!angular.isArray(logos)) return [];
            //前端分页
            var length = Math.ceil(logos.length/16);//不是8的倍数多余的logo会被截断
            var arr = [];
            for (var i = 0; i < length; i++) {
                var end = (i+1)*16 > logos.length ? logos.length : (i+1)*16;
                var item = logos.slice(i*16, end);
                arr.push(item);
            }
            console.log(arr);
            return arr;
        }
        
    }]);
});