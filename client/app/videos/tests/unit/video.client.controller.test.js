// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'video' module unit test suite
describe('Testing VideoController Controller', function() {
    // Define global variables
    var _scope, VideoController;

    // Define a pre-tests function
    beforeEach(function() {
        // Load the 'mean' module
        module('mean');

        // Use the 'inject' method to inject services
        inject(function($rootScope, $controller) {
            // Create a mock scope object
            _scope = $rootScope.$new();

            // Create a new mock controller
            VideoController = $controller('VideoController', {
                $scope: _scope
            });
        });
    });


    it('VideoController Should be registered', function() {
        expect(VideoController).toBeDefined();
    });


    it('Should have "loadeVideo" method', function() {
        expect(_scope.loadVideo).toBeDefined();
    });

    // Test the 'loadVideo' method
    it('LoadVideo method will get single video using $http service.', (function() {
        // Use the 'inject' method to inject services
        inject(function($httpBackend) {
            // Create a sample videos
            var sampleVideo = {
                status: "success",
                data: {
                    _id: "593d2844167e8a1758d9f5d3",
                    name: "[9] How does Node.js work",
                    description: "New to Node.js? Check out this video that explains \" How does Node work ? \"",
                    url : "videos/How_does_Node.js_work.mp4",
                    ratings: [ 3,3,4,6,7,]
                }
            };

            // Define a request assertion
            $httpBackend.expectGET(/\/video\?sessionId=.*&videoId=.*/).respond(sampleVideo);

            _scope.loadVideo();
 			
 			// Flush the mock HTTP results
            $httpBackend.flush();

            expect(_scope.videos.length).toEqual(1);
            expect(_scope.videos).toBeArrayOfObjects();

        });
    }));
});
