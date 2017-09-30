// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'videos' service
angular.module('videos').factory('Videos', ['$http', '$localStorage', 'Ratings',
	function($http, $localStorage, Ratings) {
		
	var loadMore = function(videos, limit) {
        var skip = videos.length > 0 ? [videos.length - 1] : 1;
        var req = {
            method: 'GET',
            url: '/videos?sessionId=' + $localStorage.sessionId + '&skip=' + skip + '&limit=' + limit,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return $http(req);
    }

    return{
    	loadMore: loadMore
    }

}]);