define(['app'], function(app) {
    app.controller('loginController', ['$scope', function($scope) {
        $scope.submit = function(form) {
            console.log(form);
        }
    }]);
});