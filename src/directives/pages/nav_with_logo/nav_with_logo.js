/* @jsdoc
 * nav bar with logos
 * @param {array} navWithLogo
 * usage: <div nav-with-logo></div>
 */
define(['app', 'navbar', 'css!directives/pages/nav_with_logo/nav_with_logo.css'], function(app) {
    app.directive('navWithLogo', [function() {
        return {
            restrict: 'A',
            templateUrl:'directives/pages/nav_with_logo/nav_with_logo.html',
            scope: {
                navBar: '=navWithLogo'
            }
        }
    }]);
});