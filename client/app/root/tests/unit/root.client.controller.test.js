// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'root' module unit test suite
describe('Testing root Controller', function() {
    // Define global variables
    var _scope, RootController;
    // Define a pre-tests function
    beforeEach(function() {
        // Load the 'mean' module
        module('mean');

        // Use the 'inject' method to inject services
        inject(function($rootScope, $controller) {
            // Create a mock scope object
            _scope = $rootScope.$new();

            // Create a new mock controller
            RootController = $controller('RootController', {
                $scope: _scope
            });
        });
    });

    it('RootController Should be registered', function() {
        expect(RootController).toBeDefined();
    });
});
