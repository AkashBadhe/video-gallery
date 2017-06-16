// Invoke 'strict' JavaScript mode
'use strict';

/**
 * Creates the 'root' controller.
 */
angular.module('root').controller('RootController', ['$scope', '$localStorage',
    function($scope, $localStorage) {
        $scope.isAuthenticated = $localStorage.userName && $localStorage.sessionId;
    }
]);