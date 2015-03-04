/*
 * Full screen image/video slideshow
 */
(function ($, window, undefined) {

    var $slides, $wrapper, $bigVideoWrap,
        $document = $(document),
        $window = $(window),
        slideCount,
        bigVideo,
        bigVideoPlayer,
        currentSlide = 0,
        nextSlide = 1,
        isTransitioning = false,
        transitionDuration = 1000;

    $document.ready(init);

    function init () {
        getEls();
        setVisible();
        createVideo();
        setNav();
    }

    function getEls () {
        $slides = $('.slide');
        $wrapper = $('.wrapper');
        slideCount = $slides.length;
    }

    function setVisible () {
        $slides.first().css({'opacity': 1});
    }

    function createVideo () {
        bigVideo = new $.BigVideo();
        bigVideo.init();
        bigVideoPlayer = bigVideo.getPlayer();
        $bigVideoWrap = $('#big-video-wrap');
        showVideo();
    }

    function showVideo () {
        var videoSrc = $slides.eq(currentSlide).attr('data-video');
        if (videoSrc) {
            bigVideo.show(videoSrc);
            $bigVideoWrap.css({opacity: 1});
            $slides.eq(currentSlide).animate({
                opacity: 0
            }, transitionDuration);
        }
    }

    function setNav () {
        var $btnNext = $('.btn-next'),
            $btnPrev = $('.btn-prev');

        $btnNext.on('click', onNext);
        $btnPrev.on('click', onPrev);

        $window.on('keydown', function (e) {
            switch(e.keyCode) {
                case 37: //left
                case 38: // up
                    $btnPrev.focus().click();
                    setTimeout(function () {
                        $btnPrev.blur();
                    }, transitionDuration);
                break;

                case 39: // right
                case 40: // down
                    $btnNext.focus().click();
                    setTimeout(function () {
                        $btnNext.blur();
                    }, transitionDuration);
                break;
            }
        });
    }

    function onNext (e) {

        e.preventDefault();

        if (isTransitioning) { return; }
        if (currentSlide >= slideCount -1) { return; }

        nextSlide = currentSlide + 1;
        transitionSlides();
    }

    function onPrev (e) {
        e.preventDefault();

        if (isTransitioning) { return; }
        if (currentSlide <= 0) { return; }

        nextSlide = currentSlide - 1;
        transitionSlides();
    }

    function transitionSlides () {
        isTransitioning = true;

        bigVideoPlayer.pause();

        $bigVideoWrap
            .animate({
                opacity: 0
            }, transitionDuration, onTransitionComplete);

        $slides.eq(currentSlide).css({opacity: 0});
        $slides.eq(nextSlide).css({opacity: 1});

        currentSlide = nextSlide;
    }

    function onTransitionComplete () {
        isTransitioning = false;
        showVideo();
    }

})(jQuery, window);