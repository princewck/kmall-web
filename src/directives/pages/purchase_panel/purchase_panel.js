define([
    'app',
    'common/qrcode.min',
    'css!./directives/pages/purchase_panel/purchase_panel.css?'
], function (app, qrcode) {
    app.directive('purchasePanel', function ($sce, $http) {
        return {
            restrict: 'AE',
            templateUrl: './directives/pages/purchase_panel/purchase_panel.html',
            link: function (scope, elements, attrs) {
                scope.purchasePanelIndex = 1;

                scope.trustAsUrl = function (url) {
                    return $sce.trustAsResourceUrl(url);
                }

                var qrcode = new QRCode("purchase-panel-qrcode", {
                    text: scope.item.coupon_link || '',
                    width: 128,
                    height: 128,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                });

                scope.$watch('item.coupon_link', function(newVal) {
                    // $http.post('../api/web/url/short', {url: newVal}).then(function(res) {
                    //     if (res.data.code === 0) {
                    //         qrcode.makeCode('http://quanerdai.com' + res.data.data);
                    //     }
                    // });
                    if(newVal) qrcode.makeCode(newVal);
                });
            },
            scope: {
                item: '=purchasePanel'
            }
        }
    });
});