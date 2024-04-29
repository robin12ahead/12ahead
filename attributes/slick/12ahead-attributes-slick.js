$(document).ready(function () {

    (function ($) {

        let $slick = $('[data-slick-slider]');

        $($slick).each(function () {
          let currentSlider = $(this);
          
            let infinite = $(this).attr("data-slick-infinite") || true;
            let speed = $(this).attr("data-slick-speed") || 500;
            let dots = $(this).attr("data-slick-dots") || false;
            let arrows = $(this).attr("data-slick-arrows") || true;
            let prevArrow = $(this).attr("data-slick-prevarrow") || '<button type="button" class="slick-prev"></button>';
            let nextArrow = $(this).attr("data-slick-nextarrow") || '<button type="button" class="slick-prev"></button>';
            let swipeToSlide = $(this).attr("data-slick-swipetoslide") || true;
            let autoplay = $(this).attr("data-slick-autoplay") || false;
            let autoplaySpeed = $(this).attr("data-slick-autoplayspeed") || 4000;
            let pauseOnHover = $(this).attr("data-slick-pauseonhover") || true;
            let slidesToShow = $(this).attr("data-slick-slides") || 1;
            let slidesToScroll = $(this).attr("data-slick-scroll") || 1;
            let slidesToShowTab = $(this).attr("data-slick-slides-tab") || 1;
            let slidesToScrollTab = $(this).attr("data-slick-scroll-tab") || 1;
            let slidesToShowMob = $(this).attr("data-slick-slides-mob") || 1;
            let slidesToScrollMob = $(this).attr("data-slick-scroll-mob") || 1;
            let adaptiveHeight = $(this).attr("data-slick-adaptiveheight") || true;
            let variableWidth = $(this).attr("data-slick-variablewidth") || false;
            let centerMode = $(this).attr("data-slick-centermode") || false;
            let centerPadding = $(this).attr("data-slick-centerpadding") || '50px';
            
            let sliderGap = $(this).attr("data-slick-gap") || '0px';
            $(currentSlider).css("--slider-gap", sliderGap)

            let nextSlide = $('[data-slick-control="next"]');
            let prevSlide = $('[data-slick-control="next"]');

            let sliderNavigation = $('[data-slick-control="navigation"]');
            let slideInputs = $(sliderNavigation).children();
            let slideInputClass = "slick-nav-item";
            let currentSlideInputClass = "slick-current-nav-item";
            $(slideInputs).addClass(slideInputClass);

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

                responsive: [
                    {
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
            $(nextSlide).each(function() {
              $(this).on('click', function () {
                $(currentSlider).slick('slickNext');
              })
            });

            // go to prev slide on click
            $(prevSlide).each(function() {
              $(this).on('click', function () {
                $(currentSlider).slick('slickPrev');
              })
            });
        
            // custom slick navigation
            $(slideInputs).each(function(index) {
      
              var slideInputCounter = ("0" + (index + 1)).slice(-2);
            
              $(this).prepend('<span class="index-counter">' + slideInputCounter + '</span>')
      
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
                var currentSlideNumer = (currentSlide ? currentSlide : 0) + 1;
      
                // console.log('current slide:' + currentSlideNumer);
                $(slideInputs).removeClass(currentSlideInputClass);
                $(sliderNavigation).find(slideInputs + ':nth-of-type(' + currentSlideNumer + ')').addClass(currentSlideInputClass);
      
                if( currentSlideNumer === slideCount ){
                  $(nextSlide).hide();
                } else {
                  $(nextSlide).show();
                }

                if (currentSlideNumer === 1) {
                  $(prevSlide).hide();
                } else {
                  $(prevSlide).show();
                }
              }
            );

        });

    })(jQuery);

});