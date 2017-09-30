// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'video' controller
angular.module('videos').controller('VideoController', ['$scope', '$http', '$localStorage', '$routeParams',
    function($scope, $http, $localStorage, $routeParams) {
        $scope.sessionId = $localStorage.sessionId;
        $scope.videos = [];
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
]);
