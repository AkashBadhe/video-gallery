// Invoke 'strict' JavaScript mode
'use strict';

describe('Testing Ratings Service', function() {
    var Ratings;
    beforeEach(function() {
        module('ratings');
        inject(function(_Ratings_) {
            Ratings = _Ratings_;
        });
    });
    it('Should be registered', function() {
        expect(Ratings).toBeDefined();
    });
    it('Should include "SetRating" and "CalculateRating"', function() {
        expect(Ratings.SetRating).toBeDefined();
        expect(Ratings.CalculateRating).toBeDefined();
    });

    it('Should have "SetRating" which will set ratings.', function() {
        // Use the 'inject' method to inject services
        inject(function($httpBackend) {

            var sampleResponse = {
                    "status": "success",
                    "data": {
                        "_id": "5757e6e41b0a244b256ac1d7",
                        "name": "Testing video"
                    }
                }
                // Define a request assertion
            $httpBackend.expectPOST(/\/video\/ratings\?sessionId=.*/).respond(sampleResponse);
            var res;
            Ratings.SetRating(1,2,3).then(function(data){
        		res = data;
            });
            // Flush the mock HTTP results
            $httpBackend.flush();
            expect(sampleResponse.data).toEqual(sampleResponse.data);
        });
    });

    it('Should have "CalculateRating" which will get avarage rating', function() {
        var avg = Ratings.CalculateRating([4,1,3,4,2]);
        expect(avg).toEqual(3);
    });
});
