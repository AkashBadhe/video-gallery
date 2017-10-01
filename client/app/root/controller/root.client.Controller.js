// Invoke 'strict' JavaScript mode
'use strict';

/**
 * Creates the 'root' controller.
 */
angular.module('root').controller('RootController', ['$scope', '$localStorage',
    function($scope, $localStorage) {
        $scope.isAuthenticated = $localStorage.userName && $localStorage.sessionId;
        angular.element(window).bind('scroll', function() {
            var listView = angular.element('#video-list'),
                videoContainer = angular.element(document.querySelector('#video-container'));
            if (listView.length > 0) {
                if (angular.element(window).scrollTop() >= videoContainer.offset().top + videoContainer.outerHeight() - window.innerHeight) {
                    angular.element('#video-list').scope().loadMore();
                }
            }
        });
    }
]);