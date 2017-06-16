// Invoke 'strict' JavaScript mode
'use strict';

describe('Testing Authentication Service', function() {
    var Authentication;
    beforeEach(function() {
        module('users');
        inject(function(_Authentication_) {
            Authentication = _Authentication_;
        });
    });
    it('Should be registered', function() {
        expect(Authentication).toBeDefined();
    });
    it('Should include "LoginUser" and "LogoutUser"', function() {
        expect(Authentication.LoginUser).toBeDefined();
        expect(Authentication.LogoutUser).toBeDefined();
    });

    it('Should have "LoginUser" which will login user using rest service.', function() {
        // Use the 'inject' method to inject services
        inject(function($httpBackend) {

            var sampleResponse = {
                    "status": "success",
                    "sessionId": "a8t9Rr9bjWD2InfeFLbNS3FNg5mnFqiV",
                    "username": "ali"
                },
                res;
            // Define a request assertion
            $httpBackend.expectPOST(/\/user\/auth/).respond(sampleResponse);

            Authentication.LoginUser().then(function(data) {
                res = data;
            });
            // Flush the mock HTTP results
            $httpBackend.flush();
            expect(res).toEqual(sampleResponse);
        });
    });

    it('Should have "LogoutUser" which will logout user using rest service.', function() {
        // Use the 'inject' method to inject services
        inject(function($httpBackend) {

            var sampleResponse = {"status":"success"},
                res;
            // Define a request assertion
            $httpBackend.expectGET(/\/user\/logout\?sessionId=.*/).respond(sampleResponse);

            Authentication.LogoutUser().then(function(data) {
                res = data;
            });
            // Flush the mock HTTP results
            $httpBackend.flush();
            expect(res).toEqual(sampleResponse);
        });
    });
});
