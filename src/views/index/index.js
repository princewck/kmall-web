define(['app'], function (app) {
    app.controller('indexController', ['$scope', function ($scope) {
        var vm = this;
        var layout = {
        
        };
        $scope.ksliderImages = [
            {img:'https://img.alicdn.com/imgextra/i2/129/TB2uQIfbwxlpuFjSszbXXcSVpXa_!!129-0-yamato.jpg_q100.jpg', title:'淘宝', bgc:'#ff3390', link:'#'},
            {img:' https://img.alicdn.com/tps/i4/TB1O5MhOVXXXXctXXXXSutbFXXX.jpg', title:'淘宝2', bgc:'#d4c79a', link:'#'},
            {img:'https://img.alicdn.com/imgextra/i2/129/TB2uQIfbwxlpuFjSszbXXcSVpXa_!!129-0-yamato.jpg_q100.jpg', title:'淘宝', bgc:'#ff3390', link:'#'},
            {img:' https://img.alicdn.com/tps/i4/TB1O5MhOVXXXXctXXXXSutbFXXX.jpg', title:'淘宝2', bgc:'#d4c79a', link:'#'},
            {img:'https://img.alicdn.com/imgextra/i2/129/TB2uQIfbwxlpuFjSszbXXcSVpXa_!!129-0-yamato.jpg_q100.jpg', title:'淘宝', bgc:'#ff3390', link:'#'},
            {img:' https://img.alicdn.com/tps/i4/TB1O5MhOVXXXXctXXXXSutbFXXX.jpg', title:'淘宝2', bgc:'#d4c79a', link:'#'},                        
        ];


        $scope.guessItems = [
            {title: 'Zbird/钻石小鸟18K金钻石戒指婚戒订婚结婚求婚钻戒女款正品-丝缠', price: 999, image:'images/product_demo.jpg', link:'https://detail.tmall.com/item.htm?spm=875.7931836/A.20161011.16.VuHLsM&abtest=_AB-LR845-PR845&pvid=c1e5c033-8405-4244-8a1b-f8b9e890af7e&pos=16&abbucket=_AB-M845_B2&acm=201509290.1003.1.1286473&id=19133990782&scm=1007.12710.67270.100200300000000'},
            {title: 'Zbird/钻石小鸟18K金钻石戒指婚戒订婚结婚求婚钻戒女款正品-丝缠', price: 999, image:'images/product_demo.jpg', link:'https://detail.tmall.com/item.htm?spm=875.7931836/A.20161011.16.VuHLsM&abtest=_AB-LR845-PR845&pvid=c1e5c033-8405-4244-8a1b-f8b9e890af7e&pos=16&abbucket=_AB-M845_B2&acm=201509290.1003.1.1286473&id=19133990782&scm=1007.12710.67270.100200300000000'},
           {title: 'Zbird/钻石小鸟18K金钻石戒指婚戒订婚结婚求婚钻戒女款正品-丝缠', price: 999, image:'images/product_demo.jpg', link:'https://detail.tmall.com/item.htm?spm=875.7931836/A.20161011.16.VuHLsM&abtest=_AB-LR845-PR845&pvid=c1e5c033-8405-4244-8a1b-f8b9e890af7e&pos=16&abbucket=_AB-M845_B2&   acm=201509290.1003.1.1286473&id=19133990782&scm=1007.12710.67270.100200300000000'},
            {title: 'Zbird/钻石小鸟18K金钻石戒指婚戒订婚结婚求婚钻戒女款正品-丝缠', price: 999, image:'images/product_demo.jpg', link:'https://detail.tmall.com/item.htm?spm=875.7931836/A.20161011.16.VuHLsM&abtest=_AB-LR845-PR845&pvid=c1e5c033-8405-4244-8a1b-f8b9e890af7e&pos=16&abbucket=_AB-M845_B2&acm=201509290.1003.1.1286473&id=19133990782&scm=1007.12710.67270.100200300000000'},
            {title: 'Zbird/钻石小鸟18K金钻石戒指婚戒订婚结婚求婚钻戒女款正品-丝缠', price: 999, image:'images/product_demo.jpg', link:'https://detail.tmall.com/item.htm?spm=875.7931836/A.20161011.16.VuHLsM&abtest=_AB-LR845-PR845&pvid=c1e5c033-8405-4244-8a1b-f8b9e890af7e&pos=16&abbucket=_AB-M845_B2&acm=201509290.1003.1.1286473&id=19133990782&scm=1007.12710.67270.100200300000000'},
            {title: 'Zbird/钻石小鸟18K金钻石戒指婚戒订婚结婚求婚钻戒女款正品-丝缠', price: 999, image:'images/product_demo.jpg', link:'https://detail.tmall.com/item.htm?spm=875.7931836/A.20161011.16.VuHLsM&abtest=_AB-LR845-PR845&pvid=c1e5c033-8405-4244-8a1b-f8b9e890af7e&pos=16&abbucket=_AB-M845_B2&acm=201509290.1003.1.1286473&id=19133990782&scm=1007.12710.67270.100200300000000'},
           {title: 'Zbird/钻石小鸟18K金钻石戒指婚戒订婚结婚求婚钻戒女款正品-丝缠', price: 999, image:'images/product_demo.jpg', link:'https://detail.tmall.com/item.htm?spm=875.7931836/A.20161011.16.VuHLsM&abtest=_AB-LR845-PR845&pvid=c1e5c033-8405-4244-8a1b-f8b9e890af7e&pos=16&abbucket=_AB-M845_B2&   acm=201509290.1003.1.1286473&id=19133990782&scm=1007.12710.67270.100200300000000'},
            {title: 'Zbird/钻石小鸟18K金钻石戒指婚戒订婚结婚求婚钻戒女款正品-丝缠', price: 999, image:'images/product_demo.jpg', link:'https://detail.tmall.com/item.htm?spm=875.7931836/A.20161011.16.VuHLsM&abtest=_AB-LR845-PR845&pvid=c1e5c033-8405-4244-8a1b-f8b9e890af7e&pos=16&abbucket=_AB-M845_B2&acm=201509290.1003.1.1286473&id=19133990782&scm=1007.12710.67270.100200300000000'},            
        ];


    }]);
});