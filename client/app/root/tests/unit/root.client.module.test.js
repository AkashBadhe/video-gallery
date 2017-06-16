// Invoke 'strict' JavaScript mode
'use strict';

describe('Testing "root" Module', function() {
    var rootModule;
    beforeEach(function() {
        rootModule = angular.module('root');
    });
    it('Should be registered', function() {
        expect(rootModule).toBeDefined();
    });
});
