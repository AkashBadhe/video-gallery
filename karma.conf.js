// Invoke 'strict' JavaScript mode
'use strict';

// Define the Protractor configuration
module.exports = function(config) {
	config.set({
		// The test framework to use
		frameworks: ['jasmine'],
		// The files load
		files: [
			'client/lib/jquery/dist/jquery.min.js',
			'client/lib/angular/angular.js',
			'client/lib/angular-resource/angular-resource.js',
			'client/lib/angular-route/angular-route.js',
			'client/lib/angular-mocks/angular-mocks.js',
			'client/lib/angular-md5/angular-md5.min.js',
			'client/lib/ngstorage/ngStorage.min.js',
			'client/lib/jasmine-expect/dist/jasmine-matchers.js',
			'client/application.js',
			'client/app/*[!lib]*/*.js',
			'client/app/*[!lib]*/*[!tests]*/*.js',
			'client/app/*[!lib]*/tests/unit/*.js',
		],
		// The reporter to use
		reporters: ['progress'],
		// The browsers to run
		browsers: ['Chrome'],
		// Test timeout
		captureTimeout: 60000,
		// Should Karma run once
		singleRun: true
	});
};