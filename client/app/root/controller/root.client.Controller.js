// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'login' controller
angular.module('root').controller('RootController', ['$scope', '$localStorage',
    function($scope, $localStorage) {
        $scope.isAuthenticated = $localStorage.userName && $localStorage.sessionId;
    }
]);