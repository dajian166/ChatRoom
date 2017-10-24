'use strict';

app.controller('ChatCtrl', ['$scope', 'socket', '$timeout', function ($scope, socket, $timeout) {
    $scope.message = '';
    $scope.username = socket.getUsername();
    $scope.messages = [];

    socket.on('new:message', function (message) {
        if (message.username === $scope.username) {
            message.portrait = 'assets/images/9.png'
        } else {
            message.portrait = 'assets/images/8.png'
        }

        message.date = new Date();
        $scope.messages.push(message);
        updateScrollTop();
    });

    $scope.sendHandler = function () {
        if (!$scope.message) {
            return;
        }

        socket.emit('new:message', {message: $scope.message});
        $scope.messages.push(
            {
                username: $scope.username,
                message: $scope.message,
                portrait: 'assets/images/9.png',
                date: new Date()
            }
        );
        $scope.message = '';
        updateScrollTop();
    };

    function updateScrollTop() {
        $timeout(function () {
            var div = document.getElementsByClassName('direct-chat-messages')[0];
            div.scrollTop = div.scrollHeight;
        });
    }
}]);
