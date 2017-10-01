// Invoke 'strict' JavaScript mode
'use strict';

/**
 * Creates the 'Videos' service.
 */
angular.module('videos').factory('Videos', ['$http', '$q', 'Authentication', 'Ratings', '$localStorage',
    function($http, $q, Authentication, Ratings, $localStorage) {
        var getVideo = function(videoId) {
            var deferred = $q.defer(),
                req = {
                    method: 'GET',
                    url: '/video?sessionId=' + $localStorage.sessionId + '&videoId=' + videoId,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

            $http(req).then(function(data) {
                deferred.resolve(data);
            }, function(data) {
                deferred.reject(data);
            });
            return deferred.promise;
        }

        var getVideos = function(skip, limit) {
            var deferred = $q.defer(),
                req = {
                    method: 'GET',
                    url: '/videos?sessionId=' + $localStorage.sessionId + '&skip=' + skip + '&limit=' + limit,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

            $http(req).then(function(data) {
                deferred.resolve(data)
            }, function(data) {
                deferred.reject(data);
            });
            return deferred.promise;
        }

        var loadMore = function(videos, limit) {
            var skip = videos.length > 0 ? [videos.length - 1] : 1;
            var req = {
                method: 'GET',
                url: '/videos?sessionId=' + $localStorage.sessionId + '&skip=' + skip + '&limit=' + limit,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            var deferred = $q.defer();

            $http(req).then(function (data) {
                    if (data.status === 200 && data.data.status === "success") {
                        angular.forEach(data.data.data, function (video, key) {
                            video.rating = Ratings.CalculateRating(video.ratings);
                        });
                        deferred.resolve(data.data.data);
                    }
                }, function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        return {
            GetVideo: getVideo,
            GetVideos: getVideos,
            LoadMore: loadMore
        }
    }
]);