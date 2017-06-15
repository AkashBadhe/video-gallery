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

    $(document).on('click', '.vido-item' , function() {
        var video = $(this).children('video').get(0); 
        var playButton = $(this).children('.playpause');

        $('video').each(function(index) {
            if (this.id != video.id) {
                this.pause();
                this.currentTime = 0;
                $(this).parents('div').find('.playpause').fadeIn();
            }
        });
        if (video.paused) {
            video.play();
            playButton.fadeOut();
        } else {
            video.pause();
            playButton.fadeIn();
        }
    });
});
