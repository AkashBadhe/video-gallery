// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'video' controller
angular.module('videos').controller('VideoController', ['$scope', '$http', '$localStorage', '$routeParams','Authentication', 'Videos',
    function($scope, $http, $localStorage, $routeParams, Authentication, Videos) {
        $scope.sessionId = $localStorage.sessionId;
        $scope.videos = [];

        /**
         * Loads single video by id.
         */
        $scope.loadVideo = function() {
            if (Authentication.IsAuthenticated) {
                Videos.GetVideo($routeParams.videoId).then(function(data) {
                    if (data.status === 200 && data.data.status === "success") {
                        $scope.videos.push(data.data.data);
                    }
                }, function(data) {

                });
            }
        }
        $scope.loadVideo();
    }
]);
