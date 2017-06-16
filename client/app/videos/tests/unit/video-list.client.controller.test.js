// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'video' module unit test suite
describe('Testing VideoListController Controller', function() {
    // Define global variables
    var _scope, VideoListController;

    // Define a pre-tests function
    beforeEach(function() {
        // Load the 'mean' module
        module('mean');

        // Use the 'inject' method to inject services
        inject(function($rootScope, $controller) {
            // Create a mock scope object
            _scope = $rootScope.$new();

            // Create a new mock controller
            VideoListController = $controller('VideoListController', {
                $scope: _scope
            });
        });
    });


    it('Should be registered', function() {
        expect(VideoListController).toBeDefined();
    });


    it('Should have loade more method', function() {
        expect(_scope.loadMore).toBeDefined();
        expect(_scope.getSelectedRating).toBeDefined();
    });
    // Test the 'loademore' method
    it('Should have loade more method to get list of videos', (function() {
        // Use the 'inject' method to inject services
        inject(function($httpBackend) {
            // Create a sample videos
            var sampleVideos = {
                status: "success",
                data: [{
                    _id: "593d2844167e8a1758d9f5d3",
                    name: "[9] How does Node.js work",
                    description: "New to Node.js? Check out this video that explains \" How does Node work ? \"",
                    url : "videos/How_does_Node.js_work.mp4",
                    ratings: [ 3,3,4,6,7,]
                }, {
                    _id: "593d2844167e8a1758d9f5d4",
                    name: "[10] iPhone 7 Trailer 2016",
                    description: "iPhone 7 concept trailer 2016! with Bluetooth AirPods by Beats and ChargingPad, and much more!",
                    url: "videos/iPhone_7_Trailer_2016.mp4",
                    ratings: [ 3,3,4,6,7,]
                }]
            };

            // Define a request assertion
            $httpBackend.expectGET(/\/videos\?sessionId=.*&skip=.*&limit=.*/).respond(sampleVideos);

            _scope.loadMore();
 			
 			// Flush the mock HTTP results
            $httpBackend.flush();

            expect(_scope.videos.length).toEqual(2);
            expect(_scope.videos).toBeArrayOfObjects();

        });
    }));
});
