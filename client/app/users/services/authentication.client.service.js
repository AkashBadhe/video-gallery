// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'Authentication' service
angular.module('users').factory('Authentication', ['$http', '$q',
    function($http, $q) {
        var loginUser = function(user) {
        	var deffered = $q.defer();
            var req = {
                method: 'POST',
                url: '/user/auth',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: user
            }

            $http(req).then(function(data) {
                if (data.status === 200 && data.data.status === "success") {
                    deffered.resolve({
                        'status': data.data.status,
                        'username': data.data.username,
                        'sessionId': data.data.sessionId
                    });
                }
            }, function(data) {
                deffered.reject({
                    'status': data.data.status,
                    'error': data.data.error
                });
            });

            return deffered.promise;
        }
        return {
            LoginUser: loginUser
        }
    }
]);
