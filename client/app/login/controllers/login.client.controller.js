// Invoke 'strict' JavaScript mode
'use strict';

/**
 * Creates login controller.
 */
angular.module('login').controller('LoginController', ['$scope', '$localStorage', 'Authentication', 'md5', '$window',
    function($scope, $localStorage, Authentication, md5, $window) {
		$scope.storage = $localStorage;		

        /**
         * Set current user name and sessionId in localStorage.
         */
        $scope.user = (function() {
            if ($scope.storage.userName && $scope.storage.sessionId) {
                return {
                    'username': $scope.storage.userName,
                    'sessionId': $scope.storage.sessionId
                };
            } 
            return null;
        }());

        $scope.loginError = null;

        /**
         * Log in user.
         */
        $scope.loginUser = function(){
            $scope.user = Authentication.LoginUser({ 
            	'username': $scope.user.username, 
            	'password': md5.createHash($scope.user.password || '') 
            }).then(function(user){
            	$scope.storage.userName = user.username;
                $scope.storage.sessionId = user.sessionId;
            	$scope.user = user;
                $(".mfp-close").trigger("click");
                $window.location.reload();
            },function(error){
            	$scope.user = error;
            });
        }
        /**
         * Log off the current user.
         */
        $scope.logoutUser = function(){
            Authentication.LogoutUser($localStorage.sessionId).then(function(){
                delete $localStorage.username;
                delete $localStorage.sessionId;
                $window.location.reload();
            });
        }
    }
]);
