// Invoke 'strict' JavaScript mode
'use strict';

/**
 * Creates the 'Authentication' service.
 */
angular.module('users').factory('Authentication', ['$http', '$q', '$localStorage',
    function($http, $q, $localStorage) {
        /**
         * Calls user login api to log in user.
         * @return {[object]} user
         */
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

        /**
         * Calls logout user api.
         * @return {[object]} sessionId
         */
        var logoutUser = function(sessionId) {
            var deffered = $q.defer();
            var req = {
                method: 'GET',
                url: '/user/logout?sessionId=' + sessionId,
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            $http(req).then(function(data) {
                if (data.status === 200 && data.data.status === "success") {
                    deffered.resolve({
                        'status': data.data.status
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

        var isAuthenticated = function(){
            return ($localStorage.userName && $localStorage.sessionId) ? true : false;
        }

        var getCurrentUser = function() {
            if ($localStorage.userName && $localStorage.sessionId) {
                return {
                    'username': $localStorage.userName,
                    'sessionId': $localStorage.sessionId
                };
            } 
            return null;
        };
        return {
            LoginUser: loginUser,
            LogoutUser: logoutUser,
            IsAuthenticated: isAuthenticated,
            GetCurrentUser: getCurrentUser
        }
    }
]);
