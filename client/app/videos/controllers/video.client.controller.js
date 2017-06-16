// Invoke 'strict' JavaScript mode
'use strict';

/**
 * Creates the 'video' controller
 */
angular.module('video').controller('VideoController', ['$scope', '$http', '$localStorage', '$routeParams',
    function($scope, $http, $localStorage, $routeParams) {
        $scope.sessionId = $localStorage.sessionId;
        $scope.videos = [];
        
        /**
         * Loads single video by id.
         */
        $scope.loadVideo = function() {
            var req = {
                method: 'GET',
                url: '/video?sessionId=' + $localStorage.sessionId + '&videoId=' + $routeParams.videoId,
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            $http(req).then(function(data) {
                if (data.status === 200 && data.data.status === "success") {
                    $scope.videos.push(data.data.data);
                }
            }, function(data) {

            });
        }

        $scope.loadVideo();
    }
]);
