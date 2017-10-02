// Invoke 'strict' JavaScript mode
'use strict';

/**
 * Creates the 'Videos' service.
 */
angular.module('videos').factory('Videos', ['$http', '$q', '$localStorage', '$log', 'Authentication', 'Ratings',
    function($http, $q, $localStorage, $log, Authentication, Ratings) {
        var service = {
            GetVideo: getVideo,
            LoadMore: loadMore
        }

        return service;

        /**
         * Gets the video by videoId.
         *
         * @param      {string}  videoId  The video identifier
         * @return     {promise}  promise object.
         */

        function getVideo(videoId) {
            var deferred = $q.defer(),
                req = {
                    method: 'GET',
                    url: '/video?sessionId=' + $localStorage.sessionId + '&videoId=' + videoId,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

            $http(req).then(function(data) {
                if (data.status === 200 && data.data.status === "success") {
                    deferred.resolve(data.data.data);
                }
            }, function(data) {
                handleError(data);
            });
            return deferred.promise;
        }

        /**
         * Loads a more.
         *
         * @param      {array}  videos  Videos array
         * @param      {string}  limit   The limit
         * @return     {promise}  promise object.
         */
        function loadMore(videos, limit) {
            var skip = videos.length > 0 ? [videos.length - 1] : 1;
            var req = {
                method: 'GET',
                url: '/videos?sessionId=' + $localStorage.sessionId + '&skip=' + skip + '&limit=' + limit,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            var deferred = $q.defer();

            $http(req).then(function(data) {
                if (data.status === 200 && data.data.status === "success") {
                    angular.forEach(data.data.data, function(video, key) {
                        video.rating = Ratings.CalculateRating(video.ratings);
                    });
                    deferred.resolve(data.data.data);
                }
            }, function(data) {
                handleError(data);
            });

            return deferred.promise;
        }

        function handleError(data) {
            $log.error("Error while loading the videos!");
            $log.log(data);
        }
    }
]);