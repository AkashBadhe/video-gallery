// Invoke 'strict' JavaScript mode
'use strict';

/**
 * Creates the 'root' controller.
 */
angular.module('root').controller('RootController', ['$scope', 'Authentication',
    function($scope, Authentication ) {
        $scope.isAuthenticated = Authentication.IsAuthenticated();
    }
]);