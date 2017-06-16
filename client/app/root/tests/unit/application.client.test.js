// Invoke 'strict' JavaScript mode
'use strict';


describe('Testing "mean" Main Module', function() {
    var mainModule;
    beforeEach(function() {
        mainModule = angular.module('mean');
    });
    it('Should be registered', function() {
        expect(mainModule).toBeDefined();
    });
});
