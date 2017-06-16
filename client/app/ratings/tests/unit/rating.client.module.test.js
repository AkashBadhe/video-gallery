// Invoke 'strict' JavaScript mode
'use strict';

describe('Testing "ratings" Module', function() {
    var ratingsModule;
    beforeEach(function() {
        ratingsModule = angular.module('ratings');
    });
    it('Should be registered', function() {
        expect(ratingsModule).toBeDefined();
    });
});
