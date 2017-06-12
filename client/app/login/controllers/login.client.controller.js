// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'login' controller
angular.module('login').controller('ExampleController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// Expose the authentication service
		$scope.authentication = Authentication;
	}
]);
