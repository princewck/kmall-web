define(['app'], function(app) {
    app.controller('couponController', ['$scope', function($scope) {
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

        /* `you may like` block test data */
        var items = [];
        for(var i=20;i;i--) {
            items.push({title: 'Zbird/钻石小鸟18K金钻石戒指婚戒订婚结婚求婚钻戒女款正品-丝缠', price: 999, image:'images/product_demo.jpg', link:'https://detail.tmall.com/item.htm?spm=875.7931836/A.20161011.16.VuHLsM&abtest=_AB-LR845-PR845&pvid=c1e5c033-8405-4244-8a1b-f8b9e890af7e&pos=16&abbucket=_AB-M845_B2&acm=201509290.1003.1.1286473&id=19133990782&scm=1007.12710.67270.100200300000000'});
        }
        $scope.guessItems = items;        
        
    }]);
});