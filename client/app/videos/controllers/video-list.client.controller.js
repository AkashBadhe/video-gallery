// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'video' controller
angular.module('videos').controller('VideoListController', ['$scope', '$http', '$localStorage', 'Ratings', 'Videos',

    function($scope, $http, $localStorage, Ratings, Videos) {
        $scope.sessionId = $localStorage.sessionId;
        $scope.videos = [];
        $scope.max = 5;

        $scope.getSelectedRating = function(videoId, rating) {
            Ratings.SetRating($scope.sessionId, videoId, rating);
        }

        $scope.loadMore = function() {
            Videos.loadMore($scope.videos, $scope.limit).then(function(data) {
                if (data.status === 200 && data.data.status === "success") {
                    angular.forEach(data.data.data, function(video, key) {
                        video.rating = Ratings.CalculateRating(video.ratings);
                    });
                    $scope.videos = $scope.videos.concat(data.data.data);
                }
            }, function(data) {

            });
        };
        $scope.loadMore();

    }
]);