// Invoke 'strict' JavaScript mode
'use strict';

/**
 * Create the 'video' controller
 */
angular.module('video').controller('VideoListController', ['$scope', '$http', '$localStorage', 'Ratings',

    function($scope, $http, $localStorage, Ratings, Videos, Authe) {
        $scope.sessionId = $localStorage.sessionId;
        $scope.videos = [];
        $scope.max = 5;

        /**
         * Sets the selected rating
         * @param  {[string]} videoId [description]
         * @param  {[int]} rating  [description]
         */
        $scope.getSelectedRating = function(videoId, rating) {
            Ratings.SetRating($scope.sessionId, videoId, rating).then(function(data) {
                //Rating Set sucessfuly.
            }, function(data) {
                //Unable to rate. Please try again.
            });
        }

        /**
         * Load more videos as user scrolls to the end of the screen.
         */
        $scope.loadMore = function() {
            if (IsAuthenticated) {
                var skip = $scope.videos.length > 0 ? [$scope.videos.length - 1] : 1;
                Videos.getVideos(skip, $scope.limit).then(function(data) {
                    if (data.status === 200 && data.data.status === "success") {
                        angular.forEach(data.data.data, function(video, key) {
                            video.rating = Ratings.CalculateRating(video.ratings);
                        });
                        $scope.videos = $scope.videos.concat(data.data.data);
                    }
                }, function(data) {

                });
            }
        }
        $scope.loadMore();
    }
]);
