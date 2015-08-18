angular.module('mobileDgnApp').controller('TopBarController', function ($scope, $rootScope, updateService) {

    //export code and switch screen
    $scope.exportCode = function () {
        $rootScope.appState = 1;
        $rootScope.genCode();
    };

    //switch back screen
    $scope.reset = function () {
        $rootScope.appState = 0;

    };

});