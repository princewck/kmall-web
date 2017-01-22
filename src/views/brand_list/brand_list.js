define(['app'], function(app) {
    app.controller('brandListController', ['$scope', '$interval', function($scope, $interval) {
        $scope.navBarList = [
            {title: '天猫超市', url: '#/'},
            {title: '天猫国际', url: '#/'},
            {title: '天猫会员', url: '#/'},
            {title: '品牌节', url: '#/'},
            {title: '电器城', url: '#/'},
            {title: '喵先生', url: '#/'},
            {title: '医药馆', url: '#/'},
            {title: '营业厅', url: '#/'},
            {title: '天天9块9', url: '#/'},
        ];

        /*测试数据 图片比例2:1*/
        var showcaseItems = [];
        for(var i=35; i; i--) {
            showcaseItems.push({
                img:'http://gju1.alicdn.com/tps/i2/1636305000555101208/TB2KiKzdOBnpuFjSZFzXXaSrpXa_!!2-juitemmedia.png_100x100.jpg', 
                url:'http://gju1.alicdn.com/tps/i2/1636305000555101208/TB2KiKzdOBnpuFjSZFzXXaSrpXa_!!2-juitemmedia.png_100x100.jpg', 
                title:'小标题'
            });
        }
        $scope.showcaseItems = groupBrandLogos(showcaseItems);
        $scope.brandLogoPage = 0;
        $interval(function() {
            $scope.brandLogoPage = ($scope.brandLogoPage + 1) % $scope.showcaseItems.length;
            console.log('当前显示第'+ ($scope.brandLogoPage + 1) +'页');
        }, 5000);

        /*brand logos 测试数据*/
        var brandBanners = [];
        for (i = 0; i < 10; i++) {
            var data1 = {
                logo:'http://gju3.alicdn.com/tps/i4/1198405000280052808/TB2.hUHcNdkpuFjy0FbXXaNnpXa_!!2-juitemmedia.png_100x100.jpg',
                banner:'http://gju2.alicdn.com/tps/i4/1000005000522777454/TB24o1DcYXlpuFjy1zbXXb_qpXa_!!0-0-jupush.jpg',
                link: 'http://baidu.com',
                desc: '恒源祥年末清仓，全场低至2折，买三送一',
                time: '距结束还剩：10小时6分45秒',
                slogon: '[恒源祥]年末清仓买3送1',
                total_number: '96'
            },
            data2 = {
                logo: 'http://gju2.alicdn.com/tps/i3/188060355563219335/TB2PLt4c80kpuFjSsziXXa.oVXa_!!2-juitemmedia.png_100x100.jpg',
                banner:'http://gju2.alicdn.com/tps/i1/1000005000525433966/TB25oawcYXlpuFjSszfXXcSGXXa_!!0-0-jupush.jpg',
                link: 'http://baidu.com',
                desc: '恒源祥年末清仓，全场低至2折，买三送一',
                time: '距结束还剩：10小时6分45秒',
                slogon: '[MiiOW/猫人]年前最后一波发货',
                total_number: '106'                
            },
            data3 = {
                logo: 'http://gju3.alicdn.com/tps/i4/167070354720642167/TB2TqFKdtRopuFjSZFtXXcanpXa_!!2-juitemmedia.png_100x100.jpg',
                banner:'http://gju1.alicdn.com/tps/i3/1000005000414929240/TB2udedc9FjpuFjSszhXXaBuVXa_!!0-0-jupush.jpg',
                link: 'http://baidu.com',
                desc: '恒源祥年末清仓，全场低至2折，买三送一',
                time: '距结束还剩：10小时6分45秒',
                slogon: '[KUKa/顾家家居]顾家年置新春',
                total_number: '134'                  
            };
            brandBanners.push(data1, data2, data3);
        }
        $scope.brandBanners = brandBanners;



        function groupBrandLogos(logos) {
            if (!angular.isArray(logos)) return [];
            //前端分页
            var length = Math.floor(logos.length/16);//不是8的倍数多余的logo会被截断
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