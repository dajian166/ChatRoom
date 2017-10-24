'use strict';

var app = angular.module('chat', ['chat.services', 'chat.directives','ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/', {
        controller: 'LoginCtrl',
        templateUrl:'/views/login-page.html'
    }).when('/chat', {
        controller: 'ChatCtrl',
        templateUrl:'/views/chat-page.html'
    }).otherwise({redirectTo:'/'});
}]);

