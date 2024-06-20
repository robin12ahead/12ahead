/**
 * Slick slider controled by custom attributs
 */

$(document).ready(function () {

  (function ($) {

    // slider selector
    const $slick = $('[data-slick-slider="true"]');

    const slideInputClass = "slick-nav-item";
    const currentSlideInputClass = "slick-current-nav-item";

    const ControlNextSlide = $('[data-slick-control="next"]');
    const ControlPrevSlide = $('[data-slick-control="prev"]');

    const sliderNavigation = $('[data-slick-control="navigation"]');

    // function for every selector
    $($slick).each(function () {

      // define currentslider var
      let currentSlider = $(this);
      let currentSliderID = $(this).attr("id");

      // attributes as settings
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
      var fade = $(this).attr("data-slick-fade") || false;
      var centerPadding = $(this).attr("data-slick-centerpadding") || '50px';

      // slider gap
      let sliderGap = $(this).attr("data-slick-gap") || '0px';
      $(currentSlider).css("--slider-gap", sliderGap)      

      // slider settings
      $(currentSlider).slick({
        infinite: JSON.parse(infinite),
        speed: speed,
        dots: JSON.parse(dots),
        arrows: JSON.parse(arrows),
        prevArrow: prevArrow,
        nextArrow: nextArrow,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToScroll,
        swipeToSlide: JSON.parse(swipeToSlide),
        autoplay: JSON.parse(autoplay),
        autoplaySpeed: autoplaySpeed,
        pauseOnHover: JSON.parse(pauseOnHover),
        adaptiveHeight: JSON.parse(adaptiveHeight),
        variableWidth: JSON.parse(variableWidth),
        centerMode: JSON.parse(centerMode),
        centerPadding: centerPadding,
        fade: JSON.parse(fade),

        responsive: [{
            breakpoint: 991,
            settings: {
              slidesToShow: slidesToShowTab,
              slidesToScroll: slidesToScrollTab,
            }
          },
          {
            breakpoint: 478,
            settings: {
              slidesToShow: slidesToShowMob,
              slidesToScroll: slidesToScrollMob,
            }
          },
        ]
      });

      // get amount of slides
      var slideCount = currentSlider.slick('getSlick').slideCount;

      // functions when slick slider changes
      currentSlider.on(
        'init reInit afterChange',
        function (event, slick, currentSlide, nextSlide) {
          var currentSlideNumber = (currentSlide ? currentSlide : 0) + 1;

          $('[data-slick-control-target="' + currentSliderID +'"]').children().removeClass(currentSlideInputClass);
          $('[data-slick-control-target="' + currentSliderID +'"]').find('.slick-nav-item:nth-of-type(' + currentSlideNumber + ')').addClass(currentSlideInputClass);

          if (JSON.parse(infinite) === false) {
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
 
    }); // end slick functions

    // Custom slider controls
    $(sliderNavigation).each(function () {

      var slideInputs = $(this).children();
      var navigationTarget = $(this).attr("data-slick-control-target");
      var navigationTarget = $(this).attr("data-slick-control-target");

      var slideInputCount = $(slideInputs).length;

      $(slideInputs).addClass(slideInputClass);
      $(slideInputs).removeClass(currentSlideInputClass);
      $('.slick-nav-item:first-of-type').addClass(currentSlideInputClass);

      $(slideInputs).each(function (index) {

        var slideInputsAmount = ("0" + (index + 1)).slice(-2);
        // $(this).prepend('<span class="index-counter">' + slideInputsAmount + '</span>')

        $(this).on('click', function () {
          $('#' + navigationTarget).slick('goTo', index);
          $(slideInputs).removeClass(currentSlideInputClass);
          $(this).addClass(currentSlideInputClass);
        });

      });
    });

    // custom slider Arrows
    var ControlTarget = "";

    // go to next slide on click
    $(ControlNextSlide).each(function () {
      $(this).on('click', function () {
        ControlTarget = $(this).attr("data-slick-control-target");
        $('#' + ControlTarget).slick('slickNext');
      })
    });

    // go to prev slide on click
    $(ControlPrevSlide).each(function () {
      $(this).on('click', function () {
        ControlTarget = $(this).attr("data-slick-control-target");
        $('#' + ControlTarget).slick('slickPrev');
      })
    });


  })(jQuery);
  
  // Styles
  var styles = `
  .slick-slider.slick-initialized .slick-list {
    margin-left: calc((var(--slider-gap) / 2) * -1);
    margin-right: calc((var(--slider-gap) / 2) * -1);
  }
  
  .slick-slider.slick-initialized .slick-slide {
    margin: 0 calc(var(--slider-gap) / 2);
  }
  `
  
  var styleSheet = document.createElement("style")
  styleSheet.innerText = styles
  document.head.appendChild(styleSheet)

});
