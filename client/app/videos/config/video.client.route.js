// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'video' module routes
angular.module('video').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/videos', {
            templateUrl: 'app/videos/views/video-list.client.view.html'
        }).
        when('/videos/:videoId', {
            templateUrl: 'app/videos/views/video.client.view.html'
        }).
        when('/', {
            redirectTo: '/videos'
        }).
        otherwise({
            redirectTo: '/videos'
        });
    }
]);
