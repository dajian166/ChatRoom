'use strict';

var directives = angular.module('chat.directives', []);

directives.directive('focus',
    function () {
        return {
            link: function (scope, element, attrs) {
                element[0].focus();
            }
        };
    });
