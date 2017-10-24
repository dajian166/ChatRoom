'use strict';

app.controller('LoginCtrl', ['$scope', 'socket', '$location', function ($scope, socket, $location) {
    $scope.username = '';

    $scope.keyupHandler = function (e) {
        var keycode = window.event ? e.keyCode : e.which;
        if (keycode !== 13) {
            return;
        }

        $scope.loginHandler();
    };

    $scope.loginHandler = function () {
        if (!$scope.username) {
            return;
        }

        $scope.isLogin = true;
        socket.emit('add:user', $scope.username);
        socket.setUsername($scope.username);
        $location.path('/chat');
    };
}]);
