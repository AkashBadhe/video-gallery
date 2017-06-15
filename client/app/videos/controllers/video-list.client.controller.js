// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'video' controller
angular.module('video').controller('VideoListController', ['$scope', '$http', '$localStorage', 'Ratings',

    function($scope, $http, $localStorage, Ratings) {
        $scope.sessionId = $localStorage.sessionId;
        $scope.videos = [];
        $scope.max = 5;

        $scope.getSelectedRating = function(videoId, rating) {
            Ratings.SetRating($scope.sessionId, videoId, rating);
        }

        $scope.loadMore = function() {
            var skip = $scope.videos.length > 0 ? [$scope.videos.length - 1] : 1;
            var req = {
                method: 'GET',
                url: '/videos?sessionId=' + $localStorage.sessionId + '&skip=' + skip + '&limit=' + $scope.limit,
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            $http(req).then(function(data) {
                if (data.status === 200 && data.data.status === "success") {
                    angular.forEach(data.data.data, function(video, key) {
                        video.rating = Ratings.CalculateRating(video.ratings);
                    });
                    $scope.videos = $scope.videos.concat(data.data.data);
                }
            }, function(data) {

            });
        }

        $scope.loadMore();

    }
]);
