// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'video' module unit test suite
describe('Testing login Controller', function() {
    // Define global variables
    var _scope, LoginController, Authentication;
    var deferred;
    var $q;
    // Define a pre-tests function
    beforeEach(function() {
        // Load the 'mean' module
        module('mean');

        // Use the 'inject' method to inject services
        inject(function($rootScope, $controller, _Authentication_, _$q_) {
            $q = _$q_;
            deferred = _$q_.defer();
            // Create a mock scope object
            _scope = $rootScope.$new();

            Authentication = _Authentication_;
            // Create a new mock controller
            LoginController = $controller('LoginController', {
                $scope: _scope
            });
        });
    });

    it('LoginController Should be registered', function() {
        expect(LoginController).toBeDefined();
    });


    it('Should have "loginUser" and "logoutUser" method', function() {
        expect(_scope.loginUser).toBeDefined();
        expect(_scope.logoutUser).toBeDefined();
    });

    describe('Testing "loginUser" method', function() {
        it('Should loginUser', function() {
            _scope.user = { 'username': 'ali', 'password': 'password' };
            spyOn(Authentication, 'LoginUser').and.callFake(function() {
                deferred.resolve({
                    'status': 'success',
                    'username': 'ali',
                    'sessionId': '124'
                });
                return deferred.promise;
            });
            _scope.loginUser();
            _scope.$apply();
            expect(_scope.storage.userName).toEqual('ali');
            expect(_scope.storage.sessionId).toEqual('124');
        });
    });
});
