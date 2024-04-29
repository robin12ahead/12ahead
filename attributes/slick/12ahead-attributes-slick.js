$(document).ready(function () {

  (function ($) {

    const $slick = $('[data-slick-slider="true"]');

    $($slick).each(function () {
      let currentSlider = $(this);

      var infinite = $(this).attr("data-slick-infinite") || true;
      var speed = $(this).attr("data-slick-speed") || 500;
      var dots = $(this).attr("data-slick-dots") || false;
      var arrows = $(this).attr("data-slick-arrows") || true;
      var prevArrow = $(this).attr("data-slick-prevarrow") || '<button type="button" class="slick-prev"></button>';
      var nextArrow = $(this).attr("data-slick-nextarrow") || '<button type="button" class="slick-next"></button>';
      var swipeToSlide = $(this).attr("data-slick-swipetoslide") || true;
      var autoplay = $(this).attr("data-slick-autoplay") || false;
      var autoplaySpeed = $(this).attr("data-slick-autoplayspeed") || 4000;
      var pauseOnHover = $(this).attr("data-slick-pauseonhover") || true;
      var slidesToShow = $(this).attr("data-slick-slides") || 1;
      var slidesToScroll = $(this).attr("data-slick-scroll") || 1;
      var slidesToShowTab = $(this).attr("data-slick-slides-tab") || 1;
      var slidesToScrollTab = $(this).attr("data-slick-scroll-tab") || 1;
      var slidesToShowMob = $(this).attr("data-slick-slides-mob") || 1;
      var slidesToScrollMob = $(this).attr("data-slick-scroll-mob") || 1;
      var adaptiveHeight = $(this).attr("data-slick-adaptiveheight") || true;
      var variableWidth = $(this).attr("data-slick-variablewidth") || false;
      var centerMode = $(this).attr("data-slick-centermode") || false;
      var centerPadding = $(this).attr("data-slick-centerpadding") || '50px';

      let sliderGap = $(this).attr("data-slick-gap") || '0px';
      $(currentSlider).css("--slider-gap", sliderGap)

      const ControlNextSlide = $('[data-slick-control="next"]');
      const ControlPrevSlide = $('[data-slick-control="prev"]');

      const sliderNavigation = $('[data-slick-control="navigation"]');
      const slideInputs = $(sliderNavigation).children();
      const slideInputClass = "slick-nav-item";
      const currentSlideInputClass = "slick-current-nav-item";
      $(slideInputs).addClass(slideInputClass);
      $(slideInputs).removeClass(currentSlideInputClass);
      $(slideInputs + ':first-of-type').addClass(currentSlideInputClass);

      $(currentSlider).slick({
        infinite: Boolean(infinite),
        speed: speed,
        dots: Boolean(dots),
        arrows: Boolean(arrows),
        prevArrow: prevArrow,
        nextArrow: nextArrow,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToScroll,
        swipeToSlide: Boolean(swipeToSlide),
        autoplay: Boolean(autoplay),
        autoplaySpeed: autoplaySpeed,
        pauseOnHover: Boolean(pauseOnHover),
        adaptiveHeight: Boolean(adaptiveHeight),
        variableWidth: Boolean(variableWidth),
        centerMode: Boolean(centerMode),
        centerPadding: centerPadding,

        responsive: [{
            breakpoint: 991,
            settings: {
              slidesToShow: slidesToShowTab,
              slidesToScroll: slidesToScrollTab,
              adaptiveHeight: Boolean(adaptiveHeight),
            }
          },
          {
            breakpoint: 478,
            settings: {
              slidesToShow: slidesToShowMob,
              slidesToScroll: slidesToScrollMob,
              adaptiveHeight: Boolean(adaptiveHeight),
            }
          },
        ]
      });

      // get amount of slides
      var slideCount = currentSlider.slick('getSlick').slideCount;

      // get amount of slick nav items
      var slideInputCount = $(slideInputs).length;

      // go to next slide on click
      $(ControlNextSlide).each(function () {
        $(this).on('click', function () {
          $(currentSlider).slick('slickNext');
        })
      });

      // go to prev slide on click
      $(ControlPrevSlide).each(function () {
        $(this).on('click', function () {
          $(currentSlider).slick('slickPrev');
        })
      });

      // custom slick navigation
      $(slideInputs).each(function (index) {

        var slideInputCounter = ("0" + (index + 1)).slice(-2);

        // $(this).prepend('<span class="index-counter">' + slideInputCounter + '</span>')

        $(this).on('click', function () {
          currentSlider.slick('goTo', index);
          $(slideInputs).removeClass(currentSlideInputClass);
          $(this).addClass(currentSlideInputClass);
        });

      });

      // functions when slick slider changes
      currentSlider.on(
        'init reInit afterChange',
        function (event, slick, currentSlide, nextSlide) {
          var currentSlideNumber = (currentSlide ? currentSlide : 0) + 1;

          // console.log('current slide:' + currentSlideNumber);
          $(slideInputs).removeClass(currentSlideInputClass);
          $('[data-slick-control="navigation"]').find('.slick-nav-item:nth-of-type(' + currentSlideNumber + ')').addClass(currentSlideInputClass);

          if (infinite === false) {
            if (currentSlideNumber === slideCount) {
              $('[data-slick-control="next"]').hide();
            } else {
              $('[data-slick-control="next"]').show();
            }

            if (currentSlideNumber === 1) {
              $('[data-slick-control="prev"]').hide();
            } else {
              $('[data-slick-control="prev"]').show();
            }
          }
        }
      );

    });

  })(jQuery);

});