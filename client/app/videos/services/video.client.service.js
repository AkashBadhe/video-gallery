// Invoke 'strict' JavaScript mode
'use strict';

/**
 * Creates the 'Videos' service.
 */
angular.module('users').factory('Videos', ['$http', '$q', 'Authentication',
    function($http, $q) {
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
        }

        return {
            GetVideo: getVideo
        }
    }
]);
