// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'ratings' service
angular.module('ratings').factory('Ratings', ['$http',
    function($http) {
        var setRating = function(sessionId, videoId, rating) {
            var req = {
                method: 'POST',
                url: 'http://localhost:3000/video/ratings?sessionId=' + sessionId,
                headers: {
                    'Content-Type': 'application/json'
                },
                body:{
                	"videoId": videoId.toString(),
                	"rating": rating.toString()
                }
            }

            $http(req).then(function(data) {
                if (data.status === 200 && data.data.status === "success") {
                    return data.data.data;
                }
            }, function(data) {
            	return data;
            });
        }

        var calculateRating = function(ratings) {
            var sum = 0;
            if (!ratings || ratings.length === 0) {
                return 0;
            } else {
                for (var i = 0; i < ratings.length; i++) {
                    sum += parseInt(ratings[i], 10); //don't forget to add the base 
                }
                var avg = sum / ratings.length;
                return avg;
            }
        }

        return {
        	SetRating: setRating,
        	CalculateRating: calculateRating
        }

    }
]);
