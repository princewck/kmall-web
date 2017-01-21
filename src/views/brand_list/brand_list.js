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
        console.log($scope.showcaseItems);

        $scope.brandLogoPage = 0;
        $interval(function() {
            $scope.brandLogoPage = ($scope.brandLogoPage + 1) % $scope.showcaseItems.length;
            console.log('当前显示第'+ ($scope.brandLogoPage + 1) +'页');
        }, 5000);

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