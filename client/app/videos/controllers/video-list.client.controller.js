// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'video' controller
angular.module('videos').controller('VideoListController', ['$scope', '$http', '$localStorage', 'Ratings', 'Videos', 'Authentication',

    function($scope, $http, $localStorage, Ratings, Videos, Authentication) {
        $scope.sessionId = $localStorage.sessionId;
        $scope.videos = [];
        $scope.max = 5;

        $scope.getSelectedRating = function(videoId, rating) {
            Ratings.SetRating($scope.sessionId, videoId, rating);
        }

        $scope.loadMore = function() {
            if (Authentication.IsAuthenticated) {
                Videos.LoadMore($scope.videos, $scope.limit).then(function(videos) {
                    $scope.videos = $scope.videos.concat(videos)
                }, function(err) {
                    //handle err.
                });
            }
        };
        $scope.loadMore();

        $scope.pauseOrPlay = function($event) {
            var currentTime = $($event.currentTarget);
            var video = currentTime.children('video').get(0);
            var playButton = currentTime.children('.playpause');

            currentTime.children('video').attr('controls', '');

            $('video').each(function(index) {
                if (this.id != video.id) {
                    this.pause();
                    this.currentTime = 0;
                    $(this).parents('div').find('.playpause').fadeIn();
                }
            });
            if (video.paused) {
                video.play();
                playButton.fadeOut();
            } else {
                video.pause();
                playButton.fadeIn();
            }
        };

        angular.element(window).bind('scroll', function() {
            var listView = angular.element('#video-list'),
                videoContainer = angular.element(document.querySelector('#video-container'));
            if (listView.length > 0) {
                if (angular.element(window).scrollTop() >= videoContainer.offset().top + videoContainer.outerHeight() - window.innerHeight) {
                    angular.element('#video-list').scope().loadMore();
                }
            }
        });
    }
]);