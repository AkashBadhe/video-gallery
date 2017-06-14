jQuery(function($) {
    $(window).bind('scroll', function() {
        var listView = $("#video-list"),
            videoContainer = $('#video-container');
        if (listView.length > 0) {
            if ($(window).scrollTop() >= videoContainer.offset().top + videoContainer.outerHeight() - window.innerHeight) {
                angular.element('#video-list').scope().loadMore();
            }
        }
    });

    $('video').off('play').on('play', function() {
        var dd = this.id
        $('video').each(function(index) {
            if (dd != this.id) {
                this.pause();
                this.currentTime = 0;
            }
        });
    });
});
