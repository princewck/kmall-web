/*
 * @params {Array} items [{main_pic: 'xx', bg_img: 'xx', title:'xxx', sub_title: 'xxx', sub_title_bg:'xxxx', link:'xxx'},..]
 * on load success , switch by 6 pictures one time
 * index 3n is in portrait view and index 3n+1 or 3n+2 is in landscape view.
 */
define(['app', 'css!directives/pages/block_group/block_group.css'], function(app) {
    app.directive('blockGroup', ['$interval',  function($interval) {
        return {
            restrict: 'A',
            templateUrl: 'directives/pages/block_group/block_group.html',
            scope: {
                items: '=',
            },
            link: function(scope) {
                if (!scope.items) throw new Error('block group items is not exist!!!');
                var pages = Math.floor(scope.items.length/3);
                var blocks = [];
                for (var i = 0;i < pages;i++) {
                    blocks.push([
                        scope.items[3*i],
                        scope.items[3*i+1],
                        scope.items[3*i+2]
                    ]);
                }
                scope.blocks = blocks;
                scope.pageIndex = 0;
                var it = $interval(function() {
                    scope.pageIndex = (scope.pageIndex + 1)%(pages-1);
                }, 5000);
                scope.$on('$destory', function() {
                    $interval.cancel(it);
                });
            }
        }
    }]);
});