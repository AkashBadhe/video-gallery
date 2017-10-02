// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'video' controller
angular.module('videos').controller('VideoController', ['$scope', '$http', '$localStorage', '$routeParams','Authentication', 'Videos',
    function($scope, $http, $localStorage, $routeParams, Authentication, Videos) {
        $scope.sessionId = $localStorage.sessionId;
        $scope.videos = [];

        /**
         * Loads a video.
         */
        $scope.loadVideo = function() {
            if (Authentication.IsAuthenticated) {
                Videos.GetVideo($routeParams.videoId).then(function(video) {
                    $scope.videos.push(video);
                });
            }
        }
        $scope.loadVideo();
    }
]);
