// Invoke 'strict' JavaScript mode
'use strict';

describe('Testing Videos Service', function() {
    var Videos;
    beforeEach(function() {
        module('videos');
        inject(function(_Videos_) {
            Videos = _Videos_;
        });
    });
    it('Should be registered', function() {
        expect(Videos).toBeDefined();
    });
    it('Should include "LoginUser" and "LogoutUser"', function() {
        expect(Videos.GetVideo).toBeDefined();
        expect(Videos.GetVideos).toBeDefined();
    });

    it('Should have "GetVideo" method which will get single video using rest service.', function() {
        // Use the 'inject' method to inject services
        inject(function($httpBackend) {

            var sampleResponse = {
                    "status": "success",
                    "data": {
                        "_id": "5757e6e41b0a244b256ac1d5",
                        "name": "[1] Google Cardboard Assembly"
                    }
                },
                res;

            
                // Define a request assertion
                $httpBackend.expectPOST(/\/videos\?sessionId=.*&videoId=.*/).respond(sampleResponse);

            Videos.GetVideo(1).then(function(data) {
                res = data;
            });
            // Flush the mock HTTP results
            $httpBackend.flush();
            expect(res).toEqual(sampleResponse);
        });
    });

    it('Should have "GetVideos" method which will get videos with specified limit', function() {
        // Use the 'inject' method to inject services
        inject(function($httpBackend) {

            var sampleResponse = {
                    "status": "success",
                    "data": [{
                        "_id": "5757e6e41b0a244b256ac1d5",
                        "name": "[1] Google Cardboard Assembly",
                    }]
                },
                res;
            // Define a request assertion
            $httpBackend.expectGET(/\/videos\?sessionId=.*&skip=.*&limit=.*/).respond(sampleResponse);

            Videos.GetVideos(1,1).then(function(data) {
                res = data;
            });
            // Flush the mock HTTP results
            $httpBackend.flush();
            expect(res).toEqual(sampleResponse);
        });
    });
});
