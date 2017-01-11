define(['app', 'css!directives/pages/guess_u_like/guess_u_like.css'], function(app) {
    app.directive('guessULike', function() {
        return {
            restrict: 'A',
            templateUrl:'directives/pages/guess_u_like/guess_u_like.html',
            scope: {
                items: '='//items should look like {title: 'xx', price: 1.00, image:'xxx', link:'xxx'}
            },
            controller: function() {
                document.getElementsByTagName('body')[0].onclick=function() {
                    alert(event.target.innerHTML);
                }
            }   
        }
    });
});