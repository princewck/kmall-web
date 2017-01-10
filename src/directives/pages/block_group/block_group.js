define(['app', 'css!directives/pages/block_group/block_group.css'], function(app) {
    app.directive('blockGroup', [ function() {
        return {
            restrict: 'A',
            templateUrl: 'directives/pages/block_group/block_group.html',
            scope: {
                items: '=', // {main_pic: 'xx', bg_img: 'xx', title:'xxx', sub_title: 'xxx', sub_title_bg:'xxxx', link:'xxx'}
            },
            controller: function($scope) {
                if (!$scope.width || $scope.width.indexOf('px')) {
                    


                }
            }
        }
    }]);
});