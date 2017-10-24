'use strict';

var services = angular.module('chat.services', []);

services.factory('socket', function ($rootScope) {
    var socket = io.connect('http://10.40.142.139:8080');
    var username = '';
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        },
        setUsername: function (name) {
            username = name;
        },
        getUsername: function () {
            return username;
        }
    };
});
