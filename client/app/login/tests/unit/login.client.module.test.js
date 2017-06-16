// Invoke 'strict' JavaScript mode
'use strict';

describe('Testing "login" Module', function() {
    var loginModule;
    beforeEach(function() {
        loginModule = angular.module('login');
    });
    it('Should be registered', function() {
        expect(loginModule).toBeDefined();
    });
});
