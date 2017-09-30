// Invoke 'strict' JavaScript mode
'use strict';

/**
 * Creates the 'video' controller
 */
angular.module('video').controller('VideoController', ['$scope', '$http', '$localStorage', '$routeParams',
    function($scope, $http, $localStorage, $routeParams, Videos) {
        $scope.sessionId = $localStorage.sessionId;
        $scope.videos = [];

        /**
         * Loads single video by id.
         */
        $scope.loadVideo = function() {
            if (IsAuthenticated) {
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
