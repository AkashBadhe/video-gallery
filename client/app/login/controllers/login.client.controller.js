// Invoke 'strict' JavaScript mode
'use strict';

/**
 * Creates login controller.
 */
angular.module('login').controller('LoginController', ['$scope', '$localStorage', 'Authentication', 'md5', '$window',
    function($scope, $localStorage, Authentication, md5, $window) {
		$scope.storage = $localStorage;		

        $scope.user = Authentication.GetCurrentUser();

        $scope.isAuthenticated = Authentication.IsAuthenticated();

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
            	$scope.loginError = error;
            });
        };
        /**
         * Log off the current user.
         */
        $scope.logoutUser = function(){
            Authentication.LogoutUser($localStorage.sessionId).then(function(){
                delete $localStorage.userName;
                delete $localStorage.sessionId;
                $window.location.reload();
            });
        };
    }
]);
