define(['app'], function (app) {
    app.controller('indexController', ['$scope', function ($scope) {
        var vm = this;
        var layout = {
        
        };

        /* banner slider test*/
        $scope.ksliderImages = [
            {img:'https://img.alicdn.com/imgextra/i2/129/TB2uQIfbwxlpuFjSszbXXcSVpXa_!!129-0-yamato.jpg_q100.jpg', title:'淘宝', bgc:'#ff3390', link:'#'},
            {img:' https://img.alicdn.com/tps/i4/TB1O5MhOVXXXXctXXXXSutbFXXX.jpg', title:'淘宝2', bgc:'#d4c79a', link:'#'},
            {img:'https://img.alicdn.com/imgextra/i2/129/TB2uQIfbwxlpuFjSszbXXcSVpXa_!!129-0-yamato.jpg_q100.jpg', title:'淘宝', bgc:'#ff3390', link:'#'},
            {img:' https://img.alicdn.com/tps/i4/TB1O5MhOVXXXXctXXXXSutbFXXX.jpg', title:'淘宝2', bgc:'#d4c79a', link:'#'},
            {img:'https://img.alicdn.com/imgextra/i2/129/TB2uQIfbwxlpuFjSszbXXcSVpXa_!!129-0-yamato.jpg_q100.jpg', title:'淘宝', bgc:'#ff3390', link:'#'},
            {img:' https://img.alicdn.com/tps/i4/TB1O5MhOVXXXXctXXXXSutbFXXX.jpg', title:'淘宝2', bgc:'#d4c79a', link:'#'},                        
        ];

        /* `you may like` block test data */
        var items = [];
        for(var i=20;i;i--) {
            items.push({title: 'Zbird/钻石小鸟18K金钻石戒指婚戒订婚结婚求婚钻戒女款正品-丝缠', price: 999, image:'images/product_demo.jpg', link:'https://detail.tmall.com/item.htm?spm=875.7931836/A.20161011.16.VuHLsM&abtest=_AB-LR845-PR845&pvid=c1e5c033-8405-4244-8a1b-f8b9e890af7e&pos=16&abbucket=_AB-M845_B2&acm=201509290.1003.1.1286473&id=19133990782&scm=1007.12710.67270.100200300000000'});
        }
        $scope.guessItems = items;


        /**block-group test */
        $scope.blockGroupItems = [
            {main_pic: 'https://img.alicdn.com/tps/i4/TB1XRb2OVXXXXcJXXXXwu0bFXXX.png', title:'小贵族书包', sub_title: '书包很漂亮', link:'https://img.alicdn.com/tps/i4/TB1XRb2OVXXXXcJXXXXwu0bFXXX.png'},
            {main_pic: 'https://img.alicdn.com/bao/uploaded/bao/upload/TB1pTjZNFXXXXXCXXXXwu0bFXXX.png',  title:'焕然一新', sub_title: '特别实惠的货',  link:'https://img.alicdn.com/bao/uploaded/bao/upload/TB1pTjZNFXXXXXCXXXXwu0bFXXX.png'},
            {main_pic: 'https://gw.alicdn.com/imgextra/i3/133/TB27iwsdraI.eBjSspaXXXIKpXa_!!133-0-yamato.jpg',  title:'年货大搜罗', sub_title: '过年送啥好？',  link:'https://gw.alicdn.com/imgextra/i3/133/TB27iwsdraI.eBjSspaXXXIKpXa_!!133-0-yamato.jpg'},
            {main_pic: 'https://img.alicdn.com/bao/upload/TB1ufMONXXXXXbVXXXXE799_VXX-800-800.jpg',  title:'必抢好货', sub_title: '快来抢，最后一秒钟',  link:'#'},
            {main_pic: 'https://gw.alicdn.com/imgextra/i2/148/TB2T4GOcbeI.eBjSspkXXaXqVXa_!!148-0-yamato.jpg',  title:'疯狂吃货', sub_title: '吃货的乐园', link:'#'},
            {main_pic: 'https://gw.alicdn.com/imgextra/i2/107/TB2ISCZbhRzc1FjSZFPXXcGAFXa_!!107-0-yamato.jpg',  title:'旅行路上', sub_title: '去哪里想好没？', link:'#'},
            {main_pic: 'https://img.alicdn.com/tps/i4/TB1xO2zOVXXXXXRapXXSutbFXXX.jpg',  title:'李美丽', sub_title: '离美丽近在咫尺',  link:'https://img.alicdn.com/tps/i4/TB1xO2zOVXXXXXRapXXSutbFXXX.jpg'},
            {main_pic: 'https://img.alicdn.com/bao/upload/TB138S2OXXXXXXFaFXXE799_VXX-800-800.jpg',  title:'时尚棉鞋', sub_title: '温暖过冬',  link:'#'},
            {main_pic: 'https://img.alicdn.com/i2/2/TB1hTlTOVXXXXXgapXXSutbFXXX.jpg',  title:'中大儿童耐磨球鞋', sub_title: '球鞋！球鞋！', link:'https://img.alicdn.com/i2/2/TB1hTlTOVXXXXXgapXXSutbFXXX.jpg'},
            {main_pic: 'https://img.alicdn.com/i2/2/TB1ELBVOVXXXXX5apXXSutbFXXX.jpg',  title:'手机馆', sub_title: '新年换新机', link:'https://img.alicdn.com/i2/2/TB1ELBVOVXXXXX5apXXSutbFXXX.jpg'},
            {main_pic: 'https://img.alicdn.com/i2/2/TB1XSQfOVXXXXbBaXXXSutbFXXX.jpg',  title:'酷玩街区', sub_title: '潮流创意', link:'https://img.alicdn.com/i2/2/TB1XSQfOVXXXXbBaXXXSutbFXXX.jpg'},
            {main_pic: 'https://img.alicdn.com/bao/upload/TB138S2OXXXXXXFaFXXE799_VXX-800-800.jpg',  title:'加绒保暖内衣', sub_title: '冬天必备', link:'#'},
        ];

    }]);
});